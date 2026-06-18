import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import size from '../../constants/size';
import spacing from '../../constants/spacing';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  progressText: {
    marginTop: spacing.md,
    fontSize: size.sm,
    color: colors.default,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.darkRed,
    marginBottom: spacing.s,
    textAlign: 'center',
  },
  reason: {
    fontSize: size.sm,
    color: colors.default,
    textAlign: 'center',
  },
  message: {
    fontSize: size.sm,
    color: colors.darkGrey,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  retryButton: {
    marginTop: spacing.md,
    alignSelf: 'stretch',
  },
});
export default styles;
