<template>
  <div>
    <div id="table_game" class="row mt-4">
      <Tablegamecomponent :title="title1" :customThemes="customThemes1" />
      <Tablegamecomponent :title="title2" :customThemes="customThemes2" />
      <Tablegamecomponent :title="title3" customThemes="gameMuchtoday" />
      <Tablegamecomponent :title="title4" customThemes="gameMuchtoday" />
    </div>

    <div id="report_user" class="row mt-4">
      <Tablereportcomponent
        :title="report1"
        customIcon="arrow_drop_up"
        customThemes="reportplus"
        topicTable1="กำไรสุทธิ"
        topicTable2="กำไรสุทธิ"
      />
      <Tablereportcomponent
        :title="report2"
        customIcon="arrow_drop_down"
        customThemes="reportminus"
        topicTable1="กำไรสุทธิ"
        topicTable2="กำไรสุทธิ"
      />
      <Tablereportcomponent
        :title="report3"
        customThemes="reportplus"
        topicTable1="Reference No."
        topicTable2="ชนะ"
      />
      <Tablereportcomponent
        :title="report4"
        customThemes="reportminus"
        topicTable1="Reference No."
        topicTable2="แพ้"
      />
    </div>
  </div>
</template>

<script>

//games
import Tablegamecomponent from "@/views/Dashboard/Tablegame/GameToday";
// reports
import Tablereportcomponent from "@/views/Dashboard/ReportUser/ReportToday";

export default {
  name: "TableGame",
  components: {
    Tablegamecomponent,
    Tablereportcomponent,
  },
  data: () => ({
    title1: "เกมบวกมากที่สุด (วันนี้)",
    title2: "เกมลบมากที่สุด (วันนี้)",
    title3: "เกมที่เล่นมากที่สุด (วันนี้)",
    title4: "ค่ายเกมที่เล่นมากที่สุด (วันนี้)",
    customThemes1: "arrow_drop_up",
    customThemes2: "arrow_drop_down",
    report1: "บวกมากที่สุด (วันนี้)",
    report2: "ลบมากที่สุด (วันนี้)",
    report3: "Ticket ที่ชนะมากที่สุด (วันนี้)",
    report4: "Ticket ที่แพ้มากที่สุด (วันนี้)",
  }),
};
</script>
