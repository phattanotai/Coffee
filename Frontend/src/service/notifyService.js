import Vue from "vue";

export default {
  error(message, position = "top-right") {
    Vue.prototype.$vs.notify({
      text: message,
      color: "danger",
      position: position,
    });
  },
  Error(message, position = "top-right") {
    Vue.prototype.$vs.notify({
      text: message,
      color: "danger",
      position: position,
    });
  },
  ERROR(message, position = "top-right") {
    Vue.prototype.$vs.notify({
      text: message,
      color: "danger",
      position: position,
    });
  },
  success(message, position = "top-right") {
    Vue.prototype.$vs.notify({
      text: message,
      color: "success",
      position: position,
    });
  },
  Success(message, position = "top-right") {
    Vue.prototype.$vs.notify({
      text: message,
      color: "success",
      position: position,
    });
  },
  SUCCESS(message, position = "top-right") {
    Vue.prototype.$vs.notify({
      text: message,
      color: "success",
      position: position,
    });
  },

  warning(message, position = "top-right") {
    Vue.prototype.$vs.notify({
      text: message,
      color: "warning",
      position: position,
    });
  },
  Warning(message, position = "top-right") {
    Vue.prototype.$vs.notify({
      text: message,
      color: "warning",
      position: position,
    });
  },
  WARNING(message, position = "top-right") {
    Vue.prototype.$vs.notify({
      text: message,
      color: "warning",
      position: position,
    });
  },
  info(message, position = "top-right") {
    Vue.prototype.$vs.notify({
      text: message,
      color: "info",
      position: position,
    });
  },
  Info(message) {
    Vue.prototype.$vs.notify({
      text: message,
      color: "info",
      position: "top-right",
    });
  },
  INFO(message) {
    Vue.prototype.$vs.notify({
      text: message,
      color: "info",
      position: "top-right",
    });
  },
};
