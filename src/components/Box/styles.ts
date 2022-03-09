import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';

// Style for Box component

const styles = StyleSheet.create({
  styledBoxView: {
    backgroundColor: colors.none,
    borderRadius: spacing.xs,
    marginBottom: spacing.xs,
    padding: spacing.sm,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowRadius: spacing.lg,
    shadowOpacity: 1,
    elevation: 3,
  },
});
export default styles;
