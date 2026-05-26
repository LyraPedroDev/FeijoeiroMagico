/**
 * FEIJOEIRO MÁGICO - INTERACTIVE ENGINE (VANILLA JS)
 * Fully customizable, high performance, zero external dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. HEADER SHRINK & SHADOW ON SCROLL
    // ==========================================================================
    const header = document.querySelector('.main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run once initially

    // ==========================================================================
    // 2. MOBILE MENU INTERACTION (Hamburger toggle)
    // ==========================================================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    const mobileLinks = navMobile.querySelectorAll('a');
    
    const toggleMobileMenu = () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        
        menuToggle.setAttribute('aria-expanded', !isOpen);
        navMobile.classList.toggle('open');
        navMobile.setAttribute('aria-hidden', isOpen);
        
        // Prevent body scroll when menu is active
        document.body.style.overflow = !isOpen ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking on links
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMobile.classList.contains('open')) {
                toggleMobileMenu();
            }
        });
    });

    // Close mobile menu on resize to desktop sizes
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && navMobile.classList.contains('open')) {
            toggleMobileMenu();
        }
    });

    // ==========================================================================
    // 3. INTERSECTION OBSERVER FOR SCROLL REVEALS (Framer Motion emulation)
    // ==========================================================================
    const animatedElements = document.querySelectorAll('.animate-scroll');
    
    if ('IntersectionObserver' in window) {
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Stop observing once animated in
                    observer.unobserve(entry.target);
                }
            });
        };
        
        const revealObserver = new IntersectionObserver(revealCallback, {
            root: null, // viewport
            threshold: 0.1, // 10% visible
            rootMargin: '0px 0px -50px 0px' // offset to animate slightly earlier
        });
        
        animatedElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback for older browsers: show elements immediately
        animatedElements.forEach(element => {
            element.classList.add('active');
        });
    }

    // ==========================================================================
    // 4. WEEKLY MENU TAB SWITCHER (Ementas Dinâmicas)
    // ==========================================================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Deactivate all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            
            // Hide all contents
            tabContents.forEach(content => {
                content.setAttribute('hidden', 'true');
                content.classList.remove('active');
            });
            
            // Activate selected button
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            
            // Show corresponding content
            const targetId = button.getAttribute('aria-controls');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.removeAttribute('hidden');
                targetContent.classList.add('active');
            }
        });
    });

    // ==========================================================================
    // 5. ACCESSIBLE DETAILS MODALS (Berçário, Creche, Jardim de Infância)
    // ==========================================================================
    const modalTriggerButtons = document.querySelectorAll('.open-modal-btn');
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    let lastActiveElement = null; // Store trigger for focus management
    
    const openModal = (modalId, triggerButton) => {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        lastActiveElement = triggerButton;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Focus first closable item for accessibility
        const closeBtn = modal.querySelector('.modal-close-btn');
        if (closeBtn) closeBtn.focus();
        
        // Trap focus inside modal
        modal.addEventListener('keydown', trapFocus);
    };
    
    const closeModal = (modal) => {
        if (!modal) return;
        
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        modal.removeEventListener('keydown', trapFocus);
        
        // Return focus to the trigger button
        if (lastActiveElement) {
            lastActiveElement.focus();
        }
    };
    
    // Focus Trap function for Accessibility (A11y)
    const trapFocus = (e) => {
        const activeModal = document.querySelector('.modal-overlay.active .modal-window');
        if (!activeModal) return;
        
        const focusableElements = activeModal.querySelectorAll('button, [href], input, select, textarea, [tabindex="0"]');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.key === 'Tab') {
            if (e.shiftKey) { // Shift + Tab: backward
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else { // Tab: forward
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    };

    // Attach listeners to triggers
    modalTriggerButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modalId = btn.getAttribute('data-modal');
            openModal(modalId, btn);
        });
    });

    // Attach close listeners
    modalOverlays.forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close-btn');
        const closeCta = modal.querySelector('.modal-close-cta');
        
        // Close via 'X' button
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModal(modal));
        }
        
        // Close via secondary visual close button
        if (closeCta) {
            closeCta.addEventListener('click', () => closeModal(modal));
        }
        
        // Close via overlay clicks
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close via 'Escape' keyboard key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal-overlay.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });

    // ==========================================================================
    // 6. ANIMATED PROGRESS DOWNLOAD CARD
    // ==========================================================================
    const downloadBtns = document.querySelectorAll('.btn-download');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Prevent multiple clicks during download
            if (btn.classList.contains('downloading')) return;
            
            btn.classList.add('downloading');
            const textSpan = btn.querySelector('.btn-text');
            const progressBar = btn.querySelector('.progress-bar');
            const originalText = textSpan.textContent;
            
            // Set loading state
            textSpan.textContent = 'A descarregar...';
            progressBar.style.width = '0%';
            
            let progress = 0;
            const duration = 1200; // 1.2s download simulation
            const start = performance.now();
            
            const animateProgress = (timestamp) => {
                const elapsed = timestamp - start;
                progress = Math.min((elapsed / duration) * 100, 100);
                progressBar.style.width = `${progress}%`;
                
                if (progress < 100) {
                    requestAnimationFrame(animateProgress);
                } else {
                    // Download complete!
                    textSpan.textContent = 'Concluído! ✔️';
                    btn.classList.remove('downloading');
                    
                    // Create direct mock PDF trigger download to user
                    const mockFileName = btn.getAttribute('data-file');
                    triggerFileDownload(mockFileName);
                    
                    // Reset button back to original state after 2 seconds
                    setTimeout(() => {
                        progressBar.style.width = '0%';
                        textSpan.textContent = originalText;
                    }, 2000);
                }
            };
            
            requestAnimationFrame(animateProgress);
        });
    });
    
    const triggerFileDownload = (filename) => {
        // Create an ephemeral mock element to trigger browser file download behavior
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(`--- Documento Oficial Feijoeiro Mágico ---\n\nNome do Ficheiro: ${filename}\n\nEste é um documento de simulação realista correspondente à informação oficial do Infantário S. Vicente.`));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    // ==========================================================================
    // 7. MAGICAL CONTACT FORM HANDLER WITH VALIDATION
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const successBlock = document.getElementById('form-success-block');
        const closeSuccessBtn = document.getElementById('close-success-btn');
        
        // Field validations patterns
        const validateEmail = (email) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email.toLowerCase());
        };
        
        const validatePhone = (phone) => {
            // Simple Portuguese 9 digit validation (usually starts with 9 or 2)
            const digits = phone.replace(/\D/g, '');
            return digits.length === 9 && (digits.startsWith('9') || digits.startsWith('2') || digits.startsWith('3'));
        };

        const checkField = (field, validationFn, errorId) => {
            const value = field.value.trim();
            const isValid = validationFn(value);
            const group = field.closest('.form-group');
            
            if (!isValid) {
                group.classList.add('invalid');
                return false;
            } else {
                group.classList.remove('invalid');
                return true;
            }
        };

        // Real-time input listeners to remove error highlights instantly when corrected
        const formFields = contactForm.querySelectorAll('input, textarea, select');
        formFields.forEach(field => {
            field.addEventListener('input', () => {
                const group = field.closest('.form-group');
                if (group && group.classList.contains('invalid')) {
                    group.classList.remove('invalid');
                }
            });
            
            field.addEventListener('change', () => {
                const group = field.closest('.form-group');
                if (group && group.classList.contains('invalid')) {
                    group.classList.remove('invalid');
                }
            });
        });

        // Form Submission
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameField = document.getElementById('form-name');
            const emailField = document.getElementById('form-email');
            const phoneField = document.getElementById('form-phone');
            const interestField = document.getElementById('form-interest');
            const messageField = document.getElementById('form-message');
            
            // Run all validations
            const isNameValid = checkField(nameField, (val) => val.length > 1, 'error-name');
            const isEmailValid = checkField(emailField, validateEmail, 'error-email');
            const isPhoneValid = checkField(phoneField, validatePhone, 'error-phone');
            const isInterestValid = checkField(interestField, (val) => val !== '', 'error-interest');
            const isMessageValid = checkField(messageField, (val) => val.length >= 10, 'error-message');
            
            const isFormValid = isNameValid && isEmailValid && isPhoneValid && isInterestValid && isMessageValid;
            
            if (!isFormValid) {
                // Find first error and focus it
                const firstInvalid = contactForm.querySelector('.form-group.invalid input, .form-group.invalid select, .form-group.invalid textarea');
                if (firstInvalid) firstInvalid.focus();
                return;
            }
            
            // Form is valid! Enter simulated sending state
            const submitBtn = contactForm.querySelector('.btn-submit-magic');
            const btnText = submitBtn.querySelector('.btn-submit-text');
            const btnIcon = submitBtn.querySelector('.btn-submit-icon');
            const paperPlaneOverlay = document.getElementById('paper-plane-scene');
            
            submitBtn.disabled = true;
            btnText.textContent = 'A Enviar Semente...';
            btnIcon.textContent = '⏳';
            
            // Disabled form elements during submission
            formFields.forEach(field => field.disabled = true);
            
            // Trigger paper-plane flight animation overlay
            if (paperPlaneOverlay) {
                paperPlaneOverlay.classList.add('active');
            }
            
            // Wait 1.8 seconds for flight path to complete before showing success box
            setTimeout(() => {
                // Trigger visual success modal overlay
                if (successBlock) {
                    successBlock.classList.add('active');
                    successBlock.setAttribute('aria-hidden', 'false');
                }
                
                // Deactivate paper-plane overlay
                if (paperPlaneOverlay) {
                    paperPlaneOverlay.classList.remove('active');
                }
                
                // Reset form details
                contactForm.reset();
                
                // Re-enable form controls
                formFields.forEach(field => field.disabled = false);
                
                // Restore submit button
                submitBtn.disabled = false;
                btnText.textContent = 'Enviar Mensagem';
                btnIcon.textContent = '🌱';
                
                // Focus on success button
                if (closeSuccessBtn) closeSuccessBtn.focus();
            }, 1800);
        });

        // Close success overlay
        if (closeSuccessBtn && successBlock) {
            closeSuccessBtn.addEventListener('click', () => {
                successBlock.classList.remove('active');
                successBlock.setAttribute('aria-hidden', 'true');
                
                // Return focus to the form
                const firstField = contactForm.querySelector('input');
                if (firstField) firstField.focus();
            });
        }
    }

    // ==========================================================================
    // 8. INTERACTIVE BEANSTALK SCROLL GROWTH
    // ==========================================================================
    const stem = document.getElementById('growing-beanstalk-stem');
    const leaves = document.querySelectorAll('.growing-leaf');
    
    if (stem) {
        const len = stem.getTotalLength();
        stem.style.strokeDasharray = len;
        stem.style.strokeDashoffset = len;
        
        const animateBeanstalk = () => {
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            // Stem grows fully when scrolled 35% of the page height
            const pathProgress = Math.min(scrollPercent * 2.8, 1);
            stem.style.strokeDashoffset = len * (1 - pathProgress);
            
            // Sprout individual leaves dynamically based on scrolled position
            const currentScrollY = window.scrollY;
            leaves.forEach(leaf => {
                const sproutPoint = parseInt(leaf.getAttribute('data-scroll'), 10);
                if (currentScrollY > sproutPoint) {
                    leaf.classList.add('sprouted');
                } else {
                    leaf.classList.remove('sprouted');
                }
            });
        };
        
        window.addEventListener('scroll', animateBeanstalk, { passive: true });
        animateBeanstalk(); // Run once initially
    }

    // ==========================================================================
    // 9. DOCUMENT VAULT MANUAL PREVIEW DRAWER TOGGLE
    // ==========================================================================
    const previewButtons = document.querySelectorAll('.btn-preview-doc');
    
    previewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-target');
            const previewPane = document.getElementById(targetId);
            
            if (previewPane) {
                const isExpanded = previewPane.classList.contains('expanded');
                
                // Toggle expansion
                previewPane.classList.toggle('expanded');
                previewPane.setAttribute('aria-expanded', !isExpanded);
                
                // Update trigger button label
                btn.textContent = isExpanded ? 'Pré-visualizar' : 'Ocultar';
            }
        });
    });

    // Scroll to elements smoothing link corrections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                // Account for height of sticky header
                const headerHeight = header.offsetHeight || 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================================================
    // 10. ACCESSIBLE DESKTOP DROPDOWN KEYBOARD NAVIGATION
    // ==========================================================================
    const desktopDropdown = document.querySelector('.nav-item-dropdown');
    if (desktopDropdown) {
        const trigger = desktopDropdown.querySelector('.dropdown-trigger');
        
        const openDropdown = () => {
            desktopDropdown.classList.add('active-focus');
            trigger.setAttribute('aria-expanded', 'true');
        };
        
        const closeDropdown = () => {
            desktopDropdown.classList.remove('active-focus');
            trigger.setAttribute('aria-expanded', 'false');
        };
        
        // Open on focus
        trigger.addEventListener('focus', openDropdown);
        
        // Listen to focusout of the entire dropdown block
        desktopDropdown.addEventListener('focusout', (e) => {
            // e.relatedTarget is the element that is receiving focus
            // If the focus goes to something outside the dropdown block, close it
            if (!desktopDropdown.contains(e.relatedTarget)) {
                closeDropdown();
            }
        });
        
        // Keyboard ESC key to close when inside
        desktopDropdown.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeDropdown();
                trigger.focus(); // Return focus to trigger
            }
        });
    }

    // ==========================================================================
    // 11. MOBILE DROPDOWN ACCORDION TOGGLE
    // ==========================================================================
    const mobileDropdownTrigger = document.querySelector('.dropdown-trigger-mobile');
    const mobileDropdownMenu = document.querySelector('.dropdown-menu-mobile');
    
    if (mobileDropdownTrigger && mobileDropdownMenu) {
        mobileDropdownTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = mobileDropdownTrigger.getAttribute('aria-expanded') === 'true';
            
            mobileDropdownTrigger.setAttribute('aria-expanded', !isOpen);
            mobileDropdownTrigger.classList.toggle('active-mobile', !isOpen);
            mobileDropdownMenu.classList.toggle('open-mobile', !isOpen);
        });
    }

    // ==========================================================================
    // 12. COMUNIDADE - TESTIMONIAL FORM INTERACTION & SUCCESS ANIMATION
    // ==========================================================================
    const formAnonimo = document.getElementById('form-anonimo');
    const formNome = document.getElementById('form-nome');
    const comunidadeForm = document.getElementById('comunidade-partilha-form');
    const successOverlay = document.getElementById('success-overlay');
    const successBackBtn = document.getElementById('success-back-btn');
    
    if (formAnonimo && formNome) {
        formAnonimo.addEventListener('change', () => {
            if (formAnonimo.checked) {
                formNome.classList.add('input-disabled');
                formNome.setAttribute('disabled', 'true');
                formNome.value = '';
                formNome.placeholder = 'Enviado Anonimamente';
            } else {
                formNome.classList.remove('input-disabled');
                formNome.removeAttribute('disabled');
                formNome.placeholder = 'Ex: Maria Silva';
            }
        });
    }

    if (comunidadeForm && successOverlay) {
        comunidadeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get textarea message to ensure it's not empty
            const msgVal = document.getElementById('form-mensagem').value.trim();
            if (!msgVal) return;
            
            const submitBtn = comunidadeForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Premium simulated loader state
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.8';
            submitBtn.innerHTML = 'A enviar para o Castelo... 🌟';
            
            setTimeout(() => {
                // Show success block overlay
                successOverlay.style.display = 'flex';
                
                // Reset form inputs
                comunidadeForm.reset();
                
                // Ensure name input is restored to default state in case anonymity was checked
                if (formNome) {
                    formNome.classList.remove('input-disabled');
                    formNome.removeAttribute('disabled');
                    formNome.placeholder = 'Ex: Maria Silva';
                }
                
                // Re-enable and restore button
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.innerHTML = originalBtnText;
            }, 1200);
        });
    }

    if (successBackBtn && successOverlay) {
        successBackBtn.addEventListener('click', (e) => {
            e.preventDefault();
            successOverlay.style.display = 'none';
        });
    }

    // ==========================================================================
    // 13. CONTACTOS PAGE - INTERACTIVE FORM VALIDATION & SUCCESS OVERLAY
    // ==========================================================================
    const contactosForm = document.getElementById('contactos-form');
    if (contactosForm) {
        const successOverlayContactos = document.getElementById('success-overlay-contactos');
        const backBtnContactos = document.getElementById('success-contactos-back-btn');
        const camposContactos = contactosForm.querySelectorAll('input, textarea');
        
        // Field elements
        const nomeField = document.getElementById('form-contactos-nome');
        const emailField = document.getElementById('form-contactos-email');
        const mensagemField = document.getElementById('form-contactos-mensagem');
        
        // Validation patterns
        const validateEmailContactos = (email) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email.toLowerCase());
        };
        
        const checkFieldContactos = (field, validationFn) => {
            const value = field.value.trim();
            const isValid = validationFn(value);
            const group = field.closest('.form-group-contactos');
            
            if (group) {
                if (!isValid) {
                    group.classList.add('invalid');
                    return false;
                } else {
                    group.classList.remove('invalid');
                    return true;
                }
            }
            return isValid;
        };
        
        // Real-time input listeners to remove error highlights instantly when corrected
        camposContactos.forEach(field => {
            field.addEventListener('input', () => {
                const group = field.closest('.form-group-contactos');
                if (group && group.classList.contains('invalid')) {
                    group.classList.remove('invalid');
                }
            });
            
            field.addEventListener('change', () => {
                const group = field.closest('.form-group-contactos');
                if (group && group.classList.contains('invalid')) {
                    group.classList.remove('invalid');
                }
            });
        });
        
        // Form Submission
        contactosForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const isNomeValid = checkFieldContactos(nomeField, (val) => val.length >= 2);
            const isEmailValid = checkFieldContactos(emailField, validateEmailContactos);
            const isMensagemValid = checkFieldContactos(mensagemField, (val) => val.length >= 10);
            
            const isFormValid = isNomeValid && isEmailValid && isMensagemValid;
            
            if (!isFormValid) {
                // Focus on first invalid field
                const firstInvalid = contactosForm.querySelector('.form-group-contactos.invalid input, .form-group-contactos.invalid textarea');
                if (firstInvalid) firstInvalid.focus();
                return;
            }
            
            // Show simulated loading status on the button
            const submitBtn = contactosForm.querySelector('button[type="submit"]');
            const originalBtnHTML = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'A enviar mensagem... ✉️';
            
            // Disable fields during submit
            camposContactos.forEach(field => field.disabled = true);
            
            // Simulate 1.2s submission as planned
            setTimeout(() => {
                // Show Success Overlay
                if (successOverlayContactos) {
                    successOverlayContactos.style.display = 'flex';
                }
                
                // Reset Form fields
                contactosForm.reset();
                
                // Re-enable controls
                camposContactos.forEach(field => field.disabled = false);
                
                // Restore button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
                
                // Focus back button for accessibility
                if (backBtnContactos) backBtnContactos.focus();
            }, 1200);
        });
        
        // Back button to close success overlay and return to writing
        if (backBtnContactos) {
            backBtnContactos.addEventListener('click', (e) => {
                e.preventDefault();
                if (successOverlayContactos) {
                    successOverlayContactos.style.display = 'none';
                }
                // Focus on first input
                if (nomeField) nomeField.focus();
            });
        }
    }

});
