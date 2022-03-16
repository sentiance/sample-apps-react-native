import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import size from '../../constants/size';

// Style for Text View component

const styles = StyleSheet.create({
  textView: {
    flexDirection: 'row',
  },
  textTitle: {
    color: colors.grey,
    fontSize: size.sm,
    fontStyle: 'italic',
  },
  statusSuccessText: {
    marginLeft: 'auto',
    color: colors.green,
    fontSize: size.sm,
    fontWeight: 'bold',
  },
  statusErrorText: {
    marginLeft: 'auto',
    color: colors.red,
    fontSize: size.sm,
    fontWeight: 'bold',
  },
  statusProgressText: {
    marginLeft: 'auto',
    color: colors.orange,
    fontSize: size.sm,
    fontWeight: 'bold',
  },
});
export default styles;
