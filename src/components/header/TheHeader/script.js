import LocationSelector from '../LocationSelector/index.vue';
import CategoriesMenu from '../CategoriesMenu/index.vue';
import LoginButton from '../LoginButton/index.vue';
import MiniCart from '../MiniCart/index.vue';
import Search from './Search/index.vue';

export default {
  components: {
    LocationSelector,
    CategoriesMenu,
    LoginButton,
    MiniCart,
    Search,
  },
  data() {
    return {
      mobileMenuOpen: false,
      isPreview: this.$route.query.preview,
    };
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
  },
  computed: {
    storeName() {
      return this.$store.state.storeName || this.$t('stores');
    },
  },
};
