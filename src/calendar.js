import https from "https";

export default function() {
  const url = "https://events.columbia.edu/feeder/main/eventsFeed.do?f=y&sort=dtstart.utc:asc&fexpr=(categories.href=%22/public/.bedework/categories/org/lib_digitalresearch%22)&skinName=list-xml&count=";
  https
    .get(url + 5, r => {
      let data = "";
      r.on("data", chunk => data += chunk);
      r.on("end", () => {
        console.log(data)
      });
    })
    .on("error", e => console.log("Error from calendar: " + e.message));
}
