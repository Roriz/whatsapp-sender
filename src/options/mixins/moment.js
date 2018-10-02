
import moment from '../plugins/moment';

export default {
  methods: {
    formattedDatetime(date) {
      return moment(date).format('L LT');
    },

    formattedDate(date) {
      return moment(date).format('L');
    },
  },
};
