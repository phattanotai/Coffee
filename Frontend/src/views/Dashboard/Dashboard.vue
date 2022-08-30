<template>
  <div>
    <Navbar navbar-page="Dashbord" />
    <div id="dashbord" class="container-fluid py-4">
      <SummaryComponent />
      <div class="row pb-4">
        <!-- Call Trand Dashboard-->
        <Tablegamecomponent />
      </div>
    </div>
  </div>
</template>

<script>
import Tablegamecomponent from "@/views/Dashboard/TableGame";
import SummaryComponent from "./SummaryUser/SummaryUser";
import Navbar from "@/layout/Navbar";
export default {
  name: "Dashbord",
  components: {
    Tablegamecomponent,
    SummaryComponent,
    Navbar,
  },
  data: () => ({}),
};
</script>