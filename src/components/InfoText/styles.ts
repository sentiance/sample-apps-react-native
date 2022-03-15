import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';
import size from '../../constants/size';

// Style for Text component

const styles = StyleSheet.create({
  TextView: {
    backgroundColor: colors.none,
    marginVertical: spacing.xs,
  },
  title: {
    fontWeight: 'bold',
    fontSize: size.sm,
  },
  text: {
    fontSize: size.sm,
    color: colors.grey,
    marginTop: spacing.xxs,
  },
  textInsideView: {
    flexDirection: 'row',
  },
  image: {
    width: spacing.md,
    height: spacing.md,
    marginHorizontal: spacing.sm,
  },
});
export default styles;
