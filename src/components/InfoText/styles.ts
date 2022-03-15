import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';

// Style for Text component

const styles = StyleSheet.create({
  TextView: {
    backgroundColor: colors.none,
    marginVertical: spacing.xs,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  text: {
    fontSize: 14,
    color: colors.grey,
    marginTop: 4,
  },
  textInsideView: {
    flexDirection: 'row',
  },
  image: {
    width: 24,
    height: 24,
    marginHorizontal: spacing.sm,
  },
});
export default styles;
