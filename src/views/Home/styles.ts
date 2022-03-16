import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import size from '../../constants/size';
import spacing from '../../constants/spacing';

const styles = StyleSheet.create({
  sdkBoxView: {
    marginBottom: 80,
    alignContent: 'center',
  },
  contentView: {
    height: '100%',
  },
  imageView: {
    width: spacing.xl,
    height: spacing.xl,
  },
  forwardImage: {
    width: spacing.sm,
    height: spacing.sm,
    alignSelf: 'center',
    marginStart: spacing.xs,
  },
  bottomView: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: spacing.sm,
  },
  boxView: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  helloTextView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  helloText: {
    fontSize: size.xxl,
    fontWeight: 'bold',
    color: colors.primary,
  },
});
export default styles;
