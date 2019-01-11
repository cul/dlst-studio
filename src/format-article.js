import $ from "jquery";

export default function(){
  $("article>p").first().addClass("lead");
  $(".post-content>p").first().addClass("lead");
}
