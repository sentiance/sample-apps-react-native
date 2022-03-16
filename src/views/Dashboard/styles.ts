import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import size from '../../constants/size';
import spacing from '../../constants/spacing';

const styles = StyleSheet.create({
  boxView: {
    marginVertical: spacing.sm,
  },
  contentView: {
    height: '100%',
  },
  divider: {
    height: 1,
    backgroundColor: colors.grey,
    marginVertical: spacing.sm,
  },
  permissionHeadingText: {
    fontWeight: 'bold',
    fontSize: size.sm,
  },
  permissionText: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: size.sm,
    color: colors.green,
  },
});
export default styles;
