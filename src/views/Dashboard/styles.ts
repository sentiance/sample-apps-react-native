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
    flex: 1,
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
    marginBottom: spacing.lg,
  },
  permissionTextError: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: size.sm,
    color: colors.red,
    marginBottom: spacing.lg,
  },
  buttonView: {
    marginBottom: 40,
  },
});
export default styles;
