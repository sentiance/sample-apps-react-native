import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';

// Style for Badge component

const styles = StyleSheet.create({
  badgeTitle: {
    color: colors.default,
    fontSize: 14,
    fontWeight: 'bold',
  },

  statusSuccessView: {
    padding: spacing.xs,
    backgroundColor: colors.lightGreen,
    alignSelf: 'baseline',
    borderRadius: 4,
    marginTop: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusSuccessText: {
    color: colors.darkGreen,
    fontSize: 20,
  },

  dotSuccessView: {
    borderRadius: spacing.xs,
    height: spacing.xs,
    width: spacing.xs,
    backgroundColor: colors.green,
    marginEnd: spacing.xs,
  },

  statusFailureView: {
    padding: spacing.xs,
    backgroundColor: colors.lightRed,
    alignSelf: 'baseline',
    borderRadius: 4,
    marginTop: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusFailureText: {
    color: colors.darkRed,
    fontSize: 20,
  },

  dotFailureView: {
    borderRadius: spacing.xs,
    height: spacing.xs,
    width: spacing.xs,
    backgroundColor: colors.red,
    marginEnd: spacing.xs,
  },
});
export default styles;
