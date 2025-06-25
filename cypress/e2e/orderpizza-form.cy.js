describe('Pizza Sipariş Uygulaması Testleri', () => {
  describe('Ana Sayfa Testleri', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('ana sayfa yüklenir ve temel elementleri gösterir', () => {
      cy.get('img[alt="Pizza Logo"]')
        .should('be.visible')
        .and('have.attr', 'src')
        .and('include', 'logo.svg');
      cy.get('.cool-text')
        .should('be.visible')
        .and('contain.text', 'KOD ACIKTIRIR')
        .and('contain.text', 'PİZZA, DOYURUR');
      cy.get('.btn')
        .should('be.visible')
        .and('contain.text', 'ACIKTIM');
    });

    it('ACIKTIM butonuna tıklayınca sipariş sayfasına yönlendirir', () => {
      cy.get('.btn')
        .contains('ACIKTIM')
        .click();
      cy.url().should('include', '/order');
    });

    it('kategori butonları görüntülenir', () => {
      cy.get('.home-buttons-flatlist')
        .should('be.visible');
      cy.get('.home-buttons-flatlist .button')
        .should('have.length.greaterThan', 0);
    });

    it('özel teklifler bölümü görüntülenir', () => {
      cy.get('.home-special-offers')
        .should('be.visible');
      cy.get('.home-special-offers-big')
        .should('be.visible');
      cy.get('.home-special-offers-small')
        .should('be.visible');
    });

    it('footer bilgileri görüntülenir', () => {
      cy.get('.home-footer')
        .should('be.visible');
      cy.get('.footer')
        .should('be.visible');
      cy.get('img[alt="Pizza Logo"]')
        .should('have.length.greaterThan', 0);
    });
  });

  describe('Pizza Sipariş Formu Testleri', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.get('.btn').contains('ACIKTIM').click();
      cy.url().should('include', '/order');
    });

    it('sipariş sayfası yüklenir ve form elementleri görüntülenir', () => {
      cy.get('.orderpizza-root', { timeout: 10000 })
        .should('be.visible');
      cy.get('input[name="name"]').should('be.visible');
      cy.get('input[name="size"]').should('exist');
      cy.get('select[name="dough"]').should('be.visible');
    });

    it('inputa metin girme testi', () => {
      const testName = 'Ahmet Yılmaz';
      cy.get('input[name="name"]')
        .should('be.visible')
        .type(testName)
        .should('have.value', testName);
      cy.get('input[name="name"]')
        .should('have.attr', 'placeholder')
        .and('include', 'Adınızı girin');
    });

    it('3 karakterden az isim girince hata mesajı gösterir', () => {
      cy.get('input[name="name"]')
        .type('Ab');
      cy.get('.orderpizza-error')
        .should('be.visible')
        .and('contain.text', 'İsim en az 3 karakter olmalı');
    });

    it('birden fazla malzeme seçilebilen test', () => {
      cy.get('.orderpizza-checkbox-grid input[type="checkbox"]')
        .should('have.length.greaterThan', 3)
        .then($checkboxes => {
          for (let i = 0; i < Math.min(5, $checkboxes.length); i++) {
            cy.wrap($checkboxes[i]).check();
          }
        });
      cy.get('.orderpizza-selection-count')
        .should('contain.text', '/10 seçili');
    });

    it('minimum 4 malzeme seçilmeden hata verir', () => {
      cy.get('.orderpizza-checkbox-grid input[type="checkbox"]')
        .first()
        .check();
      cy.get('.orderpizza-checkbox-grid input[type="checkbox"]')
        .eq(1)
        .check();
      cy.get('.orderpizza-error')
        .should('be.visible')
        .and('contain.text', 'En az 4 malzeme seçmelisiniz');
    });

    it('pizza boyutu seçilebilir', () => {
      cy.get('input[name="size"][value="M"]')
        .check()
        .should('be.checked');
    });

    it('hamur türü seçilebilir', () => {
      cy.get('select[name="dough"]')
        .select('ince')
        .should('have.value', 'ince');
    });

    it('pizza adedi artırılıp azaltılabilir', () => {
      cy.get('.orderpizza-quantity')
        .should('contain.text', '1');
      cy.get('.orderpizza-quantity-controls button')
        .last()
        .click();
      cy.get('.orderpizza-quantity')
        .should('contain.text', '2');
      cy.get('.orderpizza-quantity-controls button')
        .first()
        .click();
      cy.get('.orderpizza-quantity')
        .should('contain.text', '1');
    });

    it('formu gönderen test - başarılı sipariş', () => {
      cy.get('input[name="name"]')
        .type('Ahmet Yılmaz');
      cy.get('input[name="size"][value="M"]')
        .check();
      cy.get('select[name="dough"]')
        .select('ince');
      cy.get('.orderpizza-checkbox-grid input[type="checkbox"]')
        .then($checkboxes => {
          for (let i = 0; i < Math.min(4, $checkboxes.length); i++) {
            cy.wrap($checkboxes[i]).check();
          }
        });
      cy.get('textarea[name="note"]')
        .type('Test sipariş notu');
      cy.get('button[type="submit"]')
        .should('not.be.disabled')
        .click();
      cy.url().should('include', '/success');
    });

    it('eksik bilgilerle form gönderilemez', () => {
      cy.get('input[name="name"]')
        .type('Ahmet');
      cy.get('button[type="submit"]')
        .should('be.disabled');
    });

    it('fiyat doğru hesaplanır', () => {
      cy.get('.orderpizza-checkbox-grid input[type="checkbox"]')
        .then($checkboxes => {
          for (let i = 0; i < Math.min(4, $checkboxes.length); i++) {
            cy.wrap($checkboxes[i]).check();
          }
        });
      cy.get('.orderpizza-total-price')
        .should('contain.text', '20.00₺');
      cy.get('.orderpizza-total-highlight')
        .should('contain.text', '105.50₺');
    });

    it('sipariş notu eklenebilir', () => {
      const testNote = 'Lütfen ekstra sıcak getirin';
      cy.get('textarea[name="note"]')
        .type(testNote)
        .should('have.value', testNote);
    });
  });

  describe('Başarı Sayfası Testleri', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.get('.btn').contains('ACIKTIM').click();
      cy.get('input[name="name"]').type('Test Kullanıcı');
      cy.get('input[name="size"][value="L"]').check();
      cy.get('select[name="dough"]').select('kalın');
      cy.get('.orderpizza-checkbox-grid input[type="checkbox"]')
        .then($checkboxes => {
          for (let i = 0; i < Math.min(4, $checkboxes.length); i++) {
            cy.wrap($checkboxes[i]).check();
          }
        });
      cy.get('textarea[name="note"]').type('Test notu');
      cy.get('button[type="submit"]').click();
    });

    it('başarı sayfası yüklenir ve sipariş detayları gösterilir', () => {
      cy.url().should('include', '/success');
      cy.get('.success-title')
        .should('be.visible')
        .and('contain.text', 'başarıyla alındı');
      cy.get('.success-details')
        .should('be.visible');
      cy.get('.success-details')
        .should('contain.text', 'Test Kullanıcı');
    });

    it('ana sayfaya dön butonu çalışır', () => {
      cy.get('.success-btn')
        .should('be.visible')
        .and('contain.text', 'Ana Sayfaya Dön')
        .click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });

    it('confetti animasyonu yüklenir', () => {
      cy.get('canvas')
        .should('exist');
    });
  });

  describe('Navigasyon Testleri', () => {
    it('ana sayfa -> sipariş -> başarı sayfası tam akış', () => {
      cy.visit('/');
      cy.get('.cool-text').should('contain.text', 'KOD ACIKTIRIR');
      cy.get('.btn').contains('ACIKTIM').click();
      cy.url().should('include', '/order');
      cy.get('input[name="name"]').type('Cypress Tester');
      cy.get('input[name="size"][value="M"]').check();
      cy.get('select[name="dough"]').select('ince');
      cy.get('.orderpizza-checkbox-grid input[type="checkbox"]')
        .then($checkboxes => {
          for (let i = 0; i < 4 && i < $checkboxes.length; i++) {
            cy.wrap($checkboxes[i]).check();
          }
        });
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/success');
      cy.get('.success-title').should('be.visible');
      cy.get('.success-btn').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  });

  describe('Responsive Tasarım Testleri', () => {
    it('mobil görünümde elementler düzgün görüntülenir', () => {
      cy.viewport(375, 667);
      cy.visit('/');
      cy.get('.cool-text').should('be.visible');
      cy.get('.btn').contains('ACIKTIM').click();
      cy.get('.orderpizza-form').should('be.visible');
      cy.get('.orderpizza-checkbox-grid').should('be.visible');
    });

    it('tablet görünümde layout düzgün çalışır', () => {
      cy.viewport(768, 1024);
      cy.visit('/');
      cy.get('.home-special-offers').should('be.visible');
      cy.get('.btn').contains('ACIKTIM').click();
      cy.get('.orderpizza-row').should('be.visible');
    });

    it('desktop görünümde tüm elementler yerinde', () => {
      cy.viewport(1280, 720);
      cy.visit('/');
      cy.get('.home-content').should('be.visible');
      cy.get('.btn').contains('ACIKTIM').click();
      cy.get('.orderpizza-main').should('be.visible');
    });
  });
});

Cypress.Commands.add('completePizzaOrder', (options = {}) => {
  const defaults = {
    name: 'Test User',
    size: 'M',
    dough: 'ince',
    extrasCount: 4,
    note: 'Test order note'
  };
  const config = { ...defaults, ...options };
  cy.visit('/');
  cy.get('.btn').contains('ACIKTIM').click();
  cy.get('input[name="name"]').type(config.name);
  cy.get(`input[name="size"][value="${config.size}"]`).check();
  cy.get('select[name="dough"]').select(config.dough);
  cy.get('.orderpizza-checkbox-grid input[type="checkbox"]')
    .then($checkboxes => {
      for (let i = 0; i < Math.min(config.extrasCount, $checkboxes.length); i++) {
        cy.wrap($checkboxes[i]).check();
      }
    });
  if (config.note) {
    cy.get('textarea[name="note"]').type(config.note);
  }
  cy.get('button[type="submit"]').click();
  cy.completePizzaOrder({
    name: 'John Doe',
    size: 'L',
    extrasCount: 6
  })
  return cy.url().should('include', '/success');
});
