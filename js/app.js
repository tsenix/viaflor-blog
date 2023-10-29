(() => {
    "use strict";
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".header__icon")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".header__icon")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const socials = document.querySelector(".header__socials");
    if (socials) {
        const socialButton = socials.querySelector(".header__socials-button");
        const socialBody = socials.querySelector(".header__socials-body");
        const socialButtonImage = socials.querySelector(".header__socials-button img");
        socialButton.addEventListener("click", (function(e) {
            e.preventDefault;
            socialBody.classList.toggle("active");
        }));
        document.addEventListener("click", (function(e) {
            const target = e.target;
            const its_socialButtonImage = target == socialButtonImage;
            const its_socialBody = target == socialBody || socialBody.contains(target);
            const its_socialButton = target == socialButton;
            const socialBody_is_active = socialBody.classList.contains("active");
            if (!its_socialButtonImage && !its_socialBody && !its_socialButton && socialBody_is_active) socialBody.classList.remove("active");
        }));
    }
    window["FLS"] = true;
    menuInit();
})();