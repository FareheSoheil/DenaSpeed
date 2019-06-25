(function(window) {
  // Define Modiran class
  function Modiran() {
    const toggleSidebarSwitch = document.querySelector(
      '.toggle-sidebar-switch',
    );
    const creativeSidebarSwitch = document.querySelector(
      '.creative-sidebar-switch',
    );
    const fixHeaderSwitch = document.querySelector('.fix-header-switch');

    // Initilize metisMenu
    this.initMetisMenu = function() {
      if (typeof metisMenu !== 'undefined') {
        $('#side-menu').metisMenu();
      }
    };

    // Check old IE browsers and show appropriate notice
    this.checkOldIE = function() {
      if ($.browser.msie && $.browser.version < 9) {
        $('#page-content').prepend(
          '<p class="alert alert-warning">مرورگر شما منسوخ و تاریخ گذشته است. از سایت  <a href="http://browsehappy.com/">browsehappy(مرور شاد اینترنت)</a> ، اقدام به به روز رسانی کنید</p>',
        );
      }
    };

    // Handle toggle-sidebar-top button
    this.toggleSidebarTop = function() {
      $('#toggle-sidebar-top').on('click', function(e) {
        e.preventDefault();
        let btn = $(this),
          icon = $(this).find('i');

        if (btn.hasClass('open')) {
          btn.removeClass('open');
          icon
            .removeClass('icon-user-following')
            .addClass('text-danger icon-user-unfollow');

          $('.sidebar-top').slideUp();
        } else {
          btn.addClass('open');
          icon
            .removeClass('text-danger icon-user-unfollow')
            .addClass('icon-user-following');

          $('.sidebar-top').slideDown();
        }
      });
    };

    // Handle toggle-sidebar button
    this.toggleSidebar = function() {
      $('#toggle-sidebar').on('click', e => {
        e.preventDefault();
        if ($('body').hasClass('sidebar-collapse')) {
          window.Modiran.changeSidebarState('expand');
        } else {
          window.Modiran.changeSidebarState('collapse');
        }
      });
    };

    // Change sidebar state
    this.changeSidebarState = function(newState) {
      if (newState === 'collapse') {
        $('body').addClass('sidebar-collapse');
      // $('.metismenu>li').removeClass('active');
      //   $('.metismenu > li > ul').removeClass('in');

        if (toggleSidebarSwitch) {
          if (!toggleSidebarSwitch.checked) {
            $('.toggle-sidebar-switch').trigger('click');
          }
        }
      } else {
        $('body').removeClass('sidebar-collapse');

        if (toggleSidebarSwitch) {
          if (toggleSidebarSwitch.checked) {
            $('.toggle-sidebar-switch').trigger('click');
          }
        }
      }

      window.Modiran.updateSettingCodes();
    };

    // Handle btn-status
    this.handleStatusButton = function() {
      $('.dropdown-status>li>a').on('click', function() {
        $('.btn-status').html($(this).html());
      });
    };

    // Define tooltip
    this.tooltip = function() {
      $("[rel='tooltip'], .has-tooltip").tooltip();
      $('.btn-code').tooltip({ title: $(this).data('title') });
    };

    // Handle code button
    this.handleCodeButton = function() {
      $('.btn-code').on('click', function(e) {
        e.preventDefault();

        let result = escapeHtml(
          $(this)
            .parent()
            .find('.code-modal')
            .html(),
        );
        result = `<pre class='codes'><code id='code-for-copy'>${result}</code></pre>`;

        $('#code-modal .modal-body').html(result);
        $('#code-modal').modal('show');
      });
    };

    // Handle code copy button
    this.handleCopyCodeButton = function() {
      $('#btn-copy').on('click', () => {
        const text = document.getElementById('code-for-copy');
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);

        document.execCommand('copy');
      });
    };

    // Define popover
    this.popover = function() {
      // Define general popover
      $("[data-toggle='popover'] .has-popover")
        .popover({
          container: 'body',
          html: true,
          trigger: 'click',
          content() {
            return $(this)
              .find('.popover-content')
              .html();
          },
        })
        .on('shown.bs.popover', function() {
          // Define elements
          const currentTrigger = $(this);
          const currentPopover = currentTrigger.data('bs.popover').tip();

          // Activate close button
          currentPopover.find('.close').click(() => {
            currentTrigger.popover('hide');
          });
        });
    };

    // Define dropdownHover
    this.dropdownHover = function() {
      if ($('.dropdown-hover').length) {
        $('.dropdown-hover').dropdownHover();
      }
    };

    // Define toggleFullScreen
    this.toggleFullScreen = function() {
      if (typeof screenfull !== 'undefined') {
        if (window.screenfull !== undefined && screenfull.enabled) {
          $('#toggle-fullscreen').click(function() {
            $(this)
              .find('i')
              .toggleClass('icon-size-fullscreen icon-size-actual');
            screenfull.toggle();
          });
        } else {
          $('#toggle-fullscreen').addClass('hide');
        }
      }
    };

    // Define boxFullScreen
    this.boxFullScreen = function() {
      if (typeof screenfull !== 'undefined') {
        if (window.screenfull !== undefined && screenfull.enabled) {
          $('.btn-fullscreen').on('click', function(e) {
            e.preventDefault();
            const toggledPanel = $(this).parents('.box')[0];
            const toggledBox = $(this).closest('.box');

            screenfull.toggle(toggledPanel);
            toggledBox.toggleClass('full');
            $(this)
              .find('i')
              .toggleClass('icon-size-fullscreen icon-size-actual');
          });
        } else {
          $('.btn-full-box').addClass('hide');
        }
      }
    };

    // Define boxCollapse
    this.boxCollapse = function() {
      const collapseButton = $('.btn-collapse');

      collapseButton.on('click', function(e) {
        e.preventDefault();
        bodyClasses = '.panel-body, .portlet-body';
        $(this)
          .closest('.box')
          .find(bodyClasses)
          .slideToggle();
        $(this)
          .find('i')
          .toggleClass('icon-arrow-up icon-arrow-down');
      });
    };

    // Define boxHide
    this.boxHide = function() {
      $('.btn-close').on('click', function(e) {
        e.preventDefault();
        $(this)
          .closest('.box')
          .animate({ opacity: '0' }, 500, function() {
            $(this)
              .closest('.box')
              .hide('fast');
          });
      });
    };

    // Define buttonsBoxCollapse
    this.buttonsBoxCollapse = function() {
      const collapseButton = $('.buttons-box .btn-toggle');

      collapseButton.on('click', function(e) {
        e.preventDefault();

        $(this)
          .parent()
          .toggleClass('in');
      });
    };

    // Handle settings box
    this.handleSettings = function() {
      // Toggle box button
      $('#toggle-setting').on('click', function(e) {
        e.preventDefault();

        $(this)
          .parent()
          .toggleClass('active');
      });

      // Change Theme Color
      $('.theme-colors .btn').on('click', function(e) {
        e.preventDefault();

        const colorName = $(this).attr('data-color');

        // Remove current theme color class
        $('body').removeClass((index, css) =>
          (css.match(/(^|\s)theme-\S+/g) || []).join(' '),
        );
        // Add new theme color class
        $('body').addClass(`theme-${colorName}`);
        $('.theme-colors .btn').removeClass('active');
        $(this).addClass('active');

        window.Modiran.updateSettingCodes();
      });

      // Update code guide box
      this.updateSettingCodes = function() {
        const currentColor = $('.theme-colors .btn.active').attr('data-color');
        const themeColor = `theme-${currentColor}`;
        let headerStatus,
          sidebarStatus,
          creativeSidebarStatus = '';

          if (creativeSidebarSwitch) {
            if (!creativeSidebarSwitch.checked) {
              creativeSidebarStatus = ' sidebar-extra';
            }
          }
        }

        const result = escapeHtml(
          `<body class="${themeColor}${headerStatus}${sidebarStatus}${creativeSidebarStatus}">`,
        );
        $('.theme-code code').html(result);
      };
      window.Modiran.updateSettingCodes();
    };

    // Handle ripple effect
    this.handleRipple = function() {
      const rippleTargets = document.querySelectorAll(
        '.active-ripple .btn:not(.no-ripple), .active-ripple .metismenu a, .ripple-effect',
      );

      [].forEach.call(rippleTargets, button => {
        const ripple = new PaperRipple();
        button.appendChild(ripple.$);
        button.addEventListener('mousedown', ev => {
          ripple.downAction(ev);
          ripple.upAction();
        });
      });
    };

    // Handle  switcheries
    this.handleSwitchery = function() {
      if (typeof Switchery !== 'undefined') {
        let size = 'small',
          color = '#999';
        new Switchery(fixHeaderSwitch, {
          size,
          color,
        });
        fixHeaderSwitch.onchange = function() {
          // Fix header setting
          if (fixHeaderSwitch.checked) {
            $('body').addClass('fix-header');
            $('#main-navbar').addClass('navbar-fixed-top');
          } else {
            $('body').removeClass('fix-header');
            $('#main-navbar').removeClass('navbar-fixed-top');
          }

          window.Modiran.updateSettingCodes();
        };

        new Switchery(toggleSidebarSwitch, {
          size,
          color,
        });
        toggleSidebarSwitch.onchange = function() {
          // Sidebar toggle setting
          if (toggleSidebarSwitch.checked) {
            window.Modiran.changeSidebarState('collapse');
          } else {
            window.Modiran.changeSidebarState('expand');
          }
        };

        new Switchery(creativeSidebarSwitch, {
          size,
          color,
        });
        creativeSidebarSwitch.onchange = function() {
          // Sidebar creative switch
          console.log(creativeSidebarSwitch.checked);
          if (creativeSidebarSwitch.checked) {
            if ($('body').hasClass('sidebar-extra')) {
              $('body').removeClass('sidebar-extra');
            }
          } else if (!$('body').hasClass('sidebar-extra')) {
            $('body').addClass('sidebar-extra');
          }
          window.Modiran.updateSettingCodes();
        };
      }
    };

    // Handle scrollbars
    this.handleScrollbars = function() {
      if (typeof mCustomScrollbar !== 'undefined') {
        $('.dropdown-menu.has-scrollbar').mCustomScrollbar({
          setHeight: 300,
          theme: 'minimal-dark',
        });
        $('.has-scrollbar').mCustomScrollbar({
          theme: 'minimal-dark',
        });
      }
    };

    // Initilize sweet alert
    this.initiSwal = function() {
      if (typeof swal !== 'undefined') {
        swal.setDefaults({
          confirmButtonText: 'تائید',
          cancelButtonText: 'لغو',
        });
      }
    };

    // Initilize iCkeck
    this.initiCkeck = function() {
      $('input:not(.normal)').iCheck({
        checkboxClass: 'icheckbox_square-grey',
        radioClass: 'iradio_square-grey',
      });
    };

    // Handle numeric text inputs
    this.handleNumericInputs = function() {
      $(document).on('input', '.numeric', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
      });
    };
  }

  // Creates a Modiran object.
  window.Modiran = new Modiran();
})(window);

function escapeHtml(text) {
  if (text == null) return;

  const html = text
    .replace(/<!--/g, '')
    .replace(/-->/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/^\s*/g, '')
    .replace(/\s*$/g, '');

  return html;
}
(function($) {
  $(document).ready(() => {
    Modiran.initMetisMenu();
    Modiran.checkOldIE();
    Modiran.toggleSidebarTop();
    Modiran.handleStatusButton();
    Modiran.toggleSidebar();
    Modiran.handleCodeButton();
    Modiran.handleCopyCodeButton();
    Modiran.tooltip();
    Modiran.popover();
    Modiran.dropdownHover();
    Modiran.toggleFullScreen();
    Modiran.boxFullScreen();
    Modiran.boxCollapse();
    Modiran.boxHide();
    Modiran.buttonsBoxCollapse();
    Modiran.handleSettings();
    Modiran.handleRipple();
    Modiran.handleSwitchery();
    Modiran.handleScrollbars();
    Modiran.initiSwal();
    Modiran.initiCkeck();
    Modiran.handleNumericInputs();
  });

  $(window).load(() => {
    // Animate loader off screen
    $('#loader').animate(
      {
        opacity: '0',
      },
      10,
      () => {
        $('#loader').css('display', 'none');
      },
    );
  });
})(jQuery);
