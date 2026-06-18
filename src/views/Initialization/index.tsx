import React, {FC, useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import SentianceCore, {
  SdkInitializationError,
} from '@sentiance-react-native/core';
import Button from '../../components/Button';
import colors from '../../constants/colors';
import styles from './styles';
import {InitializationProps} from './typings';

const Initialization: FC<InitializationProps> = ({onInitialized}) => {
  const [error, setError] = useState<SdkInitializationError | null>(null);

  const awaitInitialization = useCallback(async () => {
    setError(null);
    try {
      await SentianceCore.ensureInitialized();
      onInitialized();
    } catch (e) {
      if (e instanceof SdkInitializationError) {
        setError(e);
      } else {
        setError(new SdkInitializationError('UNKNOWN', String(e)));
      }
    }
  }, [onInitialized]);

  useEffect(() => {
    awaitInitialization();
  }, [awaitInitialization]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.title}>SDK initialization failed</Text>
        <Text style={styles.reason}>Reason: {error.reason}</Text>
        {!!error.message && <Text style={styles.message}>{error.message}</Text>}
        <View style={styles.retryButton}>
          <Button type="default" text="Retry" onClick={awaitInitialization} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.progressText}>Initializing the Sentiance SDK…</Text>
    </View>
  );
};

export default Initialization;
