/*
import $ from "jquery";

export default function() {
  const externalLinkHTML =
    "<span>&nbsp;<i class='icon fa fa-small fa-external-link-alt'></i></span>";
  $("a[href^='http']:not(a:has(img)):not(.no-ext)").html(function(_, html) {
    if (!html.match("fa-external-link-alt")) {
      $(this).append($.parseHTML(externalLinkHTML));
    }
  });
}
*/
