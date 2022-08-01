import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import size from '../../constants/size';
import spacing from '../../constants/spacing';

// Style for Header component

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: colors.default,
  },

  imageView: {
    marginVertical: spacing.s,
    width: 194,
    height: size.xl,
    alignSelf: 'center',
  },
});
export default styles;
