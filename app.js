/* ---------------
// Vue App
--------------- */

new Vue({
  el: "#app",
  vuetify: new Vuetify(),

  store: store,
  data: () => ({
    rutAmount: 100, // How many ruts will be generated
    // table related
    tableHeaders: [
      {
        text: "ID",
        align: "center",
        sortable: true,
        value: "id",
      },
      {
        text: "RUT",
        align: "center",
        sortable: true,
        value: "rut",
      },
      {
        text: "Acciones", // Buttons
        align: "center",
        sortable: false,
        value: "actions",
      },
    ],
    // snackbar related
    snackbar: false,
    snackbarText: '',
    snackbarTimeout: 3000,
    // drawer related
    drawer: null,
    drawerItems: [
      { title: 'Visitar web de Vue', icon: 'mdi-earth', href: 'https://vuejs.org' },
      { title: 'Visitar web de Vuex', icon: 'mdi-earth', href: 'https://vuex.vuejs.org' },
      { title: 'Visitar web de Vuetify', icon: 'mdi-earth', href: 'https://vuetifyjs.com' },
    ],
  }),

  created() {
    console.log("created()");
    this.generate(); // fill the table on start
  },

  computed: {
    // get the list of RUTs formatted
    getTableItems() {
      var _ruts = this.$store.getters.getRuts();
      var rows = [];
      for (let i = 0; i < _ruts.length; i++) {
        const rutSplit = _ruts[i].split('-');
        rows.push({
          id: i + 1,          
          rut: formatNumber(rutSplit[0], '.') + '-' + rutSplit[1] // method 1
          // rut: new Intl.NumberFormat('es-ES').format(rutSplit[0]) + '-' + rutSplit[1] // method 2
        });
      }
      return rows;
    },
  },

  methods: {

    // Show messages to the user using a snackbar
    showMessage(message) {
      if (message) {
        console.log("showMessage()", message);
        this.snackbarText = message;
        this.snackbar = true;
      }
    },

    // Generate a bunch of random RUTs 
    generate() {      
      console.log(`generar(${this.rutAmount})`);
      let counter = 0;
      const MAX_ITERATIONS = 1000;
      let _ruts = [];
      
      while (_ruts.length < this.rutAmount && counter <= MAX_ITERATIONS) {
        counter++;
        const r = generateRUT(8000000, 70000000);
        if (r) _ruts.push(r);          
      }

      // Sort RUTs
      _ruts.sort((a, b) => {
        a = padStart(a, 12);
        b = padStart(b, 12);
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });

      this.$store.dispatch("setRuts", _ruts);

      this.showMessage(`${this.rutAmount} nuevos RUTs se han generado`);
    },

    // Copy to de clipboard
    copyItem(item) {
      console.log(`copyItem(${item.rut})`);
      
      navigator.clipboard.writeText(item.rut)
      .then(() => {
        console.log('Copying to clipboard was successful!');
        this.showMessage(`El RUT ${item.rut} fue \ncopiado al portapapeles`);
      }, (err) => {
        console.error('Could not copy text: ', err);
      });
    },

  },
});
