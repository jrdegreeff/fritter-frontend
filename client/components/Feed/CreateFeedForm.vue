<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateFeedForm',
  mixins: [BlockForm],
  props: {
    title: {
      type: String,
      default: 'Create feed'
    },
    parent: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      url: '/api/feeds',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'name', label: 'Name', value: ''}
      ],
      refreshFeeds: true,
      callback: () => {
        const message = 'Successfully created feed!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
