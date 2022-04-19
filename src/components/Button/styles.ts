import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';

// Style for Button component

const styles = StyleSheet.create({
  buttonView: {
    backgroundColor: colors.primary,
    marginBottom: spacing.sm,
    marginHorizontal: spacing.sm,
    paddingVertical: spacing.s,
    borderRadius: spacing.xs,
    alignItems: 'center',
  },
  buttonHollowView: {
    backgroundColor: colors.lightBlue,
    marginBottom: spacing.sm,
    marginHorizontal: spacing.sm,
    paddingVertical: spacing.s,
    borderRadius: spacing.xs,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonText: {
    color: colors.none,
    fontSize: spacing.sm,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonHollowText: {
    color: colors.primary,
    fontSize: spacing.sm,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default styles;
