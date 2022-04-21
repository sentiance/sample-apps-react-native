import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import size from '../../constants/size';

const styles = StyleSheet.create({
  contentView: {
    height: '100%',
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
