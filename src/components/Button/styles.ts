import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';

// Style for Button component

const styles = StyleSheet.create({
  buttonView: {
    backgroundColor: colors.primary,
    marginBottom: spacing.sm,
    marginHorizontal: spacing.sm,
    paddingVertical: spacing.s,
    borderRadius: spacing.xs,
    alignItems: 'center',
  },

  buttonText: {
    color: colors.none,
    fontSize: spacing.sm,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default styles;
