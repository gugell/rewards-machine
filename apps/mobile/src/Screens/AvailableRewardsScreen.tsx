import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import { AppNavigationStackScreenProps } from '../app/App';

import RewardItem from '../components/RewardItem';

import { useTranslation } from 'react-i18next';
import useFetchRewards from '../hooks/useFetchRewards';

type AvailableRewardsScreenProps = {
  title: string;
};

const AvailableRewardsScreen: FC<AvailableRewardsScreenProps> = () => {
  const { rewards, fetchRewards, isError, isLoading } = useFetchRewards();
  const { navigate } =
    useNavigation<AppNavigationStackScreenProps['navigation']>();

  const { t } = useTranslation();

  const onGoToCollectedRewardsPress = () => {
    navigate('CollectedRewardsScreen');
  };

  const onRefresh = () => fetchRewards(false);

  return (
    <View style={style.wrapper}>
      {!isError ? (
        <FlatList
          data={rewards}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <RewardItem reward={item} />}
          keyExtractor={(item) => item.id}
          onEndReached={() => fetchRewards()}
          onRefresh={onRefresh}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
          refreshing={isLoading}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            <View>
              <ActivityIndicator
                animating={isLoading}
                style={style.loading}
                size={'large'}
              />
            </View>
          }
        />
      ) : (
        <View style={style.error}>
          <Text style={style.error__text}> {t('genericError')}</Text>
        </View>
      )}
      <Button mode="contained" onPress={onGoToCollectedRewardsPress}>
        {t('collectedItemsCTA')}
      </Button>
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },

  loading: {
    margin: 8,
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error__text: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
  },
  button: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'aqua',
  },
});
export default AvailableRewardsScreen;
