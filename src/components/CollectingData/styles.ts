import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';

const styles = StyleSheet.create({
  statusView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageView: {
    height: spacing.sm,
    width: spacing.sm,
    marginEnd: spacing.xxs,
  },
  successText: {
    color: colors.green,
  },
  errorText: {
    color: colors.red,
  },
});
export default styles;
