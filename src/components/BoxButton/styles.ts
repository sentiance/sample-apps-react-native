import {StyleSheet} from 'react-native';
import spacing from '../../constants/spacing';

// Style for Box Button component

const styles = StyleSheet.create({
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
  sdkBoxView: {
    alignContent: 'center',
    position: 'absolute',
    bottom: 100,
    width: '100%',
  },
});
export default styles;
