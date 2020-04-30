/* eslint-disable no-underscore-dangle */
import { products } from '../../../../api';
import { locale } from '../../../common/shared';

const createData = ({ results }, loc) => results.reduce(
  (result, item) => {
    // eslint-disable-next-line no-param-reassign
    result[item.name[loc]] = item;
    return result;
  }, {},
);
const product = (p, loc) => `
<li>
  <div>
    <div style="float:left">
      <img 
        style="width:50px"
        src="${p?.masterVariant?.images[0]?.url}" 
      />
    </div>
    <div style="float:left">
      <div>${p.name[loc]}</div>
      <div>price</div>
    </div>
  </div>
  <div style="clear:both"></div>
</li>
`;
export default {
  data() {
    return {
      searchText: this.$route.query.q || '',
    };
  },
  methods: {
    search() {
      const { query } = this.$route;
      this.$router.push({
        name: 'products',
        params: {
          categorySlug: 'all',
          page: 1,
        },
        query: { ...query, q: this.searchText },
      });
    },
  },
  mounted() {
    const component = this;
    let data = {};
    $(this.$refs.search).autocomplete({
      position: { my: 'right top', at: 'right bottom' },
      select: (event, ui) => {
        const { slug, masterVariant } = data[ui.item.label];
        this.$router.push({
          name: 'product',
          params: {
            productSlug: slug[locale(component)],
            sku: masterVariant.sku,
          },
        });
      },
      source: (request, response) => {
        if (request?.term?.length > 3) {
          const loc = locale(component);
          products.get([
            {
              page: 1,
              pageSize: 5,
              [`text.${loc}`]: request.term,
            },
            {},
            loc,
          ]).then(
            (res) => {
              // eslint-disable-next-line no-const-assign
              data = createData(res, loc);
              response(res.results.map(({ name }) => name[loc]));
            },
          );
        }
      },
    }).autocomplete('instance')._renderItem = function renderItem(ul, item) {
      return $(product(data[item.label], locale(component))).appendTo(ul);
    };
  },
  beforeDestroy() {
    $(this.$refs.search).autocomplete('destroy');
  },
  watch: {
    $route(to) {
      this.searchText = to.query.q || '';
    },
  },
};
