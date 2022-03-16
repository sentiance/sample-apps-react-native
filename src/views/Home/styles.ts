import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  sdkBoxView: {
    marginBottom: 80,
    alignContent: 'center',
  },
  contentView: {
    height: '100%',
  },
  imageView: {
    width: 64,
    height: 64,
  },
  forwardImage: {
    width: 16,
    height: 16,
    alignSelf: 'center',
    marginStart: 8,
  },
  bottomView: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 16,
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
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
  },
});
export default styles;
