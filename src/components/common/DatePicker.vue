<template>
<div class="date-picker">
  <date-picker
    ref="picker"
    input-class="date-picker__input"
    :value="_value"
    :language="languages[language]"
    :disabled-dates="disableDate"
    :format="dateFormat"
    @selected="changeDate"
  ></date-picker>
  <input type="textbox"
    v-model="convertDate"
    readonly
    :class="[convertDate && '-active']"
    :name="name"
    :required="required"
    :data-validate-field="validate"
    @click.stop="chooseDate">
</div>
</template>

<script>
import DatePicker from 'vuejs-datepicker'
import moment from 'moment'
import * as lang from 'vuejs-datepicker/dist/locale'

export default {
  name: 'Datepicker',

  props: {
    name: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: 'fr'
    },
    required: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    validate: String,
    disableDay: {
      type: String,
      default: ''
    }
  },

  components: {
    DatePicker
  },

  data: () => ({
    languages: lang,
    convertDate: ''
  }),

  computed: {
    disableDate: vm => {
      vm.disableDay
        ? Object.assign({}, { to: new Date(Date.now()) })
        : Object.assign({}, { from: new Date(Date.now()) })
      switch (vm.disableDay) {
        case 'future':
          return Object.assign({}, { from: new Date(Date.now()) })
        case 'past':
          return Object.assign({}, { to: new Date(Date.now()) })
        default:
          return {}
      }
    },

    _value: vm => vm.value && moment(vm.value, 'DD/MM/YYYY').format('MM/DD/YYYY')
  },

  methods: {
    dateFormat (date) {
      this.convertDate = moment(date).format('DD/MM/YYYY')
      this.$emit('update:value', this.convertDate)
    },

    chooseDate () {
      this.$refs.picker.showCalendar()
    },

    changeDate (date) {
      this.$emit('change')
    }
  },

  watch: {
    value () {
      this.convertDate = ''
    }
  }
}
</script>

<style lang="scss">
.date-picker {
  &__input {
    display: none;
  }

  input {
    appearance: none;
    padding: 1.1rem 1rem 1rem;
    width: 100%;
    border: 1px solid $color-black-trans-1;
    user-select: none;
  }

  .vdp-datepicker__calendar {
    z-index: z-index(date-picker)
  }
}
</style>
