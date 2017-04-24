function myFunction() {
    alert("I am an alert box!"); /*ALERT FUNCTION!*/
}

(function () {
    $(function () {
        var SideBAR;
        SideBAR = (function () {
            function SideBAR() {}

            SideBAR.prototype.expandMyMenu = function () {
                  $('#slider-container').show();
                return $("nav.sidebar").removeClass("sidebar-menu-collapsed").addClass("sidebar-menu-expanded");
            };

            SideBAR.prototype.collapseMyMenu = function () {
                  $('#slider-container').hide();
                return $("nav.sidebar").removeClass("sidebar-menu-expanded").addClass("sidebar-menu-collapsed");
            };

            SideBAR.prototype.showMenuTexts = function () {
                return $("nav.sidebar ul a span.expanded-element").show();
            };

            SideBAR.prototype.hideMenuTexts = function () {
                return $("nav.sidebar ul a span.expanded-element").hide();
            };

            SideBAR.prototype.showActiveSubMenu = function () {
                $("li.active ul.level2").show();
                return $("li.active a.expandable").css({
                    width: "100%"
                });
            };

            SideBAR.prototype.hideActiveSubMenu = function () {
                return $("li.active ul.level2").hide();
            };

            SideBAR.prototype.adjustPaddingOnExpand = function () {
                $("ul.level1 li a.expandable").css({
                    padding: "1px 4px 4px 0px"
                });
                return $("ul.level1 li.active a.expandable").css({
                    padding: "1px 4px 4px 4px"
                });
            };

            SideBAR.prototype.resetOriginalPaddingOnCollapse = function () {
                $("ul.nbs-level1 li a.expandable").css({
                    padding: "4px 4px 4px 0px"
                });
                return $("ul.level1 li.active a.expandable").css({
                    padding: "4px"
                });
            };

            SideBAR.prototype.RotateArrow = function () {
               return $("#justify-icon").css({
                    color:"#010"
                });
            };

            SideBAR.prototype.ignite = function () {
                return (function (instance) {
                    return $("#justify-icon").click(function (e) {
                        if ($(this).parent("nav.sidebar").hasClass("sidebar-menu-collapsed")) {
                            instance.adjustPaddingOnExpand();
                            instance.expandMyMenu();
                            instance.showMenuTexts();
                            instance.showActiveSubMenu();
                            instance.RotateArrow();

                            // ****************Hide Feature************************
                            var x = document.getElementById('inside');
                            if (x.style.display === 'none') {
                                x.style.display = 'block';
                            } else {
                                x.style.display = 'none';
                            }
                            // ***************************************************

                            var iSelector = $(this).find('i:first');
                            if (iSelector.hasClass('glyphicon-align-right')) {
                                iSelector.removeClass('glyphicon-align-right')
                                iSelector.addClass('glyphicon-align-left')
                            } else if (iSelector.hasClass('glyphicon-align-left')) {
                                iSelector.removeClass('glyphicon-align-left')
                                iSelector.addClass('glyphicon-align-right')
                            }

                            $(this).css({
                                "color": "#00BFFF"
                            });
                            //{"propertyname":"value","propertyname":"value",...});
                        }
                        else if ($(this).parent("nav.sidebar").hasClass("sidebar-menu-expanded")) {
                            instance.resetOriginalPaddingOnCollapse();
                            instance.collapseMyMenu();
                            instance.hideMenuTexts();
                            instance.hideActiveSubMenu();

                            // ****************Hide Feature************************
                            var x = document.getElementById('inside');
                            if (x.style.display === 'none') {
                                x.style.display = 'block';
                            } else {
                                x.style.display = 'none';
                            }
                            // ***************************************************

                            var iSelector = $(this).find('i:first');
                            if (iSelector.hasClass('glyphicon-align-right')) {
                                iSelector.removeClass('glyphicon-align-right')
                                iSelector.addClass('glyphicon-align-left')
                            } else if (iSelector.hasClass('glyphicon-align-left')) {
                                iSelector.removeClass('glyphicon-align-left')
                                iSelector.addClass('glyphicon-align-right')
                            }

                            $(this).css({
                                "color": "#00BFFF"
                            });
                        }
                        return false;
                    });
                })(this);
            };

            return SideBAR;

        })();
        return (new SideBAR).ignite();
    });

}).call(this);