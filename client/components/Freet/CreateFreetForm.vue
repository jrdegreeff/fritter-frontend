<!-- Form for creating freets (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateFreetForm',
  mixins: [BlockForm],
  props: {
    title: {
      type: String,
      default: 'Create freet'
    },
    parent: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      url: '/api/freets',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'content', label: 'Content', value: ''},
        {id: 'parent', hidden: true, value: this.parent}
      ],
      refreshFreets: true,
      callback: () => {
        const message = 'Successfully created freet!';
        if (this.parent) {
          this.$store.commit('alert', {
            message, status: 'success'
          });
          this.$router.go(-1);
        } else {
          this.$set(this.alerts, message, 'success');
          setTimeout(() => this.$delete(this.alerts, message), 3000);
        }
      }
    };
  }
};
</script>
