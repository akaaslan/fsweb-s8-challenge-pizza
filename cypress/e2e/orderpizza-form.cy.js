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

  describe('OrderPizza Formu', () => {
    beforeEach(() => {
      cy.viewport(1280, 800);
      cy.visit('/');
      cy.get('.btn').contains('ACIKTIM').should('be.visible').click();
      cy.url().should('include', '/order');
      cy.get('.orderpizza-root', { timeout: 10000 }).should('be.visible');
      cy.get('input[name="name"]', { timeout: 10000 }).should('exist');
    });

    it('inputa metin girilebilir', () => {
      cy.get('input[name="name"]')
        .should('exist')
        .clear()
        .type('Test Kullanıcı')
        .should('have.value', 'Test Kullanıcı');
    });

    it('birden fazla malzeme seçilebilir', () => {
      cy.get('.orderpizza-checkbox-grid input[type="checkbox"]')
        .should('have.length.greaterThan', 3)
        .then($checkboxes => {
          cy.wrap($checkboxes[0]).check({ force: true });
          cy.wrap($checkboxes[1]).check({ force: true });
          cy.wrap($checkboxes[2]).check({ force: true });
          cy.wrap($checkboxes[3]).check({ force: true });
        });
      cy.get('.orderpizza-selection-count').should('contain.text', '/10 seçili');
    });

    it('form başarıyla gönderilebilir', () => {
      cy.get('input[name="name"]').clear().type('Test Kullanıcı');
      cy.get('input[type="radio"][name="size"]').first().check({ force: true });
      cy.get('select[name="dough"]').select(1); // ilk gerçek seçenek
      cy.get('.orderpizza-checkbox-grid input[type="checkbox"]')
        .then($checkboxes => {
          cy.wrap($checkboxes[0]).check({ force: true });
          cy.wrap($checkboxes[1]).check({ force: true });
          cy.wrap($checkboxes[2]).check({ force: true });
          cy.wrap($checkboxes[3]).check({ force: true });
        });
      cy.get('textarea[name="note"]').type('Ekstra not.');
      cy.get('button[type="submit"]').should('not.be.disabled').click();
      cy.url({ timeout: 10000 }).should('include', '/success');
    });
  });

  describe('OrderPizza Formu ek testler', () => {
    beforeEach(() => {
      cy.viewport(1280, 800);
      cy.visit('/');
      cy.get('.btn').contains('ACIKTIM').should('be.visible').click();
      cy.url().should('include', '/order');
      cy.get('.orderpizza-root', { timeout: 10000 }).should('be.visible');
      cy.get('input[name="name"]', { timeout: 10000 }).should('exist');
    });

    it('isim inputu boşken form gönderilemez', () => {
      cy.get('input[name="name"]').clear();
      cy.get('button[type="submit"]').should('be.disabled');
    });

    it('en fazla 10 malzeme seçilebilir', () => {
      cy.get('.orderpizza-checkbox-grid input[type="checkbox"]')
        .should('have.length.greaterThan', 10)
        .then($checkboxes => {
          for (let i = 0; i < 10; i++) {
            cy.wrap($checkboxes[i]).check({ force: true });
          }
          if ($checkboxes[10]) {
            cy.wrap($checkboxes[10]).should('be.disabled');
          }
        });
      cy.get('.orderpizza-selection-count').should('contain.text', '10/10');
    });

    it('adet arttırma ve azaltma doğru çalışır', () => {
      cy.get('.orderpizza-quantity').invoke('text').then((adet) => {
        cy.get('.orderpizza-quantity-controls button').last().click();
        cy.get('.orderpizza-quantity').should('contain.text', Number(adet) + 1);
        cy.get('.orderpizza-quantity-controls button').first().click();
        cy.get('.orderpizza-quantity').should('contain.text', adet);
      });
    });

    it('hamur seçilmeden form gönderilemez', () => {
      cy.get('input[name="name"]').type('Test Kullanıcı');
      cy.get('input[type="radio"][name="size"]').first().check({ force: true });
      cy.get('.orderpizza-checkbox-grid input[type="checkbox"]')
        .then($checkboxes => {
          cy.wrap($checkboxes[0]).check({ force: true });
          cy.wrap($checkboxes[1]).check({ force: true });
          cy.wrap($checkboxes[2]).check({ force: true });
          cy.wrap($checkboxes[3]).check({ force: true });
        });
      cy.get('select[name="dough"]').select(0); 
      cy.get('button[type="submit"]').should('be.disabled');
    });

    it('boyut seçilmeden form gönderilemez', () => {
      cy.get('input[name="name"]').type('Test Kullanıcı');
      cy.get('select[name="dough"]').select(1);
      cy.get('.orderpizza-checkbox-grid input[type="checkbox"]')
        .then($checkboxes => {
          cy.wrap($checkboxes[0]).check({ force: true });
          cy.wrap($checkboxes[1]).check({ force: true });
          cy.wrap($checkboxes[2]).check({ force: true });
          cy.wrap($checkboxes[3]).check({ force: true });
       });
      cy.get('button[type="submit"]').should('be.disabled');
    });

    it('malzeme seçilmeden form gönderilemez', () => {
      cy.get('input[name="name"]').type('Test Kullanıcı');
      cy.get('input[type="radio"][name="size"]').first().check({ force: true });
      cy.get('select[name="dough"]').select(1);
      cy.get('.orderpizza-checkbox-grid input[type="checkbox"]').each($cb => {
        cy.wrap($cb).uncheck({ force: true });
      });
      cy.get('button[type="submit"]').should('be.disabled');
    });

    it('not alanı boş bırakılabilir ve form yine de gönderilebilir', () => {
      cy.get('input[name="name"]').clear().type('Test Kullanıcı');
      cy.get('input[type="radio"][name="size"]').first().check({ force: true });
      cy.get('select[name="dough"]').select(1);
      cy.get('.orderpizza-checkbox-grid input[type="checkbox"]')
        .then($checkboxes => {
          cy.wrap($checkboxes[0]).check({ force: true });
          cy.wrap($checkboxes[1]).check({ force: true });
          cy.wrap($checkboxes[2]).check({ force: true });
          cy.wrap($checkboxes[3]).check({ force: true });
        });
      cy.get('textarea[name="note"]').clear();
      cy.get('button[type="submit"]').should('not.be.disabled').click();
      cy.url({ timeout: 10000 }).should('include', '/success');
    });

    it('isim inputu 3 karakterden az girilirse submit butonu disabled olur', () => {
      cy.get('input[name="name"]').clear().type('ab');
      cy.get('button[type="submit"]').should('be.disabled');
    });

    it('isim inputu 3 karakter girilince submit butonu hala disabled olur (diğer alanlar eksik)', () => {
      cy.get('input[name="name"]').clear().type('abc');
      cy.get('button[type="submit"]').should('be.disabled');
    });

    it('boyut ve hamur seçili, 4 malzeme seçili, isim boşsa submit yine de enabled olur', () => {
      cy.get('input[type="radio"][name="size"]').first().check({ force: true });
      cy.get('select[name="dough"]').select(1);
      cy.get('.orderpizza-checkbox-grid input[type="checkbox"]').then($checkboxes => {
        cy.wrap($checkboxes[0]).check({ force: true });
        cy.wrap($checkboxes[1]).check({ force: true });
        cy.wrap($checkboxes[2]).check({ force: true });
        cy.wrap($checkboxes[3]).check({ force: true });
      });
      cy.get('input[name="name"]').clear();
      cy.get('button[type="submit"]').should('be.enabled');
    });

    it('adet arttırınca toplam fiyat artar', () => {
      cy.get('input[name="name"]').type('Test Kullanıcı');
      cy.get('input[type="radio"][name="size"]').first().check({ force: true });
      cy.get('select[name="dough"]').select(1);
      cy.get('.orderpizza-checkbox-grid input[type="checkbox"]').then($checkboxes => {
        cy.wrap($checkboxes[0]).check({ force: true });
        cy.wrap($checkboxes[1]).check({ force: true });
        cy.wrap($checkboxes[2]).check({ force: true });
        cy.wrap($checkboxes[3]).check({ force: true });
      });
      cy.get('.orderpizza-total-highlight').invoke('text').then((fiyat1) => {
        cy.get('.orderpizza-quantity-controls button').last().click();
        cy.get('.orderpizza-total-highlight').invoke('text').should(fiyat2 => {
          expect(fiyat2).not.to.eq(fiyat1);
        });
      });
    });

    it('adet azaltınca toplam fiyat azalır', () => {
      cy.get('input[name="name"]').type('Test Kullanıcı');
      cy.get('input[type="radio"][name="size"]').first().check({ force: true });
      cy.get('select[name="dough"]').select(1);
      cy.get('.orderpizza-checkbox-grid input[type="checkbox"]').then($checkboxes => {
        cy.wrap($checkboxes[0]).check({ force: true });
        cy.wrap($checkboxes[1]).check({ force: true });
        cy.wrap($checkboxes[2]).check({ force: true });
        cy.wrap($checkboxes[3]).check({ force: true });
      });
      cy.get('.orderpizza-quantity-controls button').last().click();
      cy.get('.orderpizza-total-highlight').invoke('text').then((fiyat1) => {
        cy.get('.orderpizza-quantity-controls button').first().click();
        cy.get('.orderpizza-total-highlight').invoke('text').should(fiyat2 => {
          expect(fiyat2).not.to.eq(fiyat1);
        });
      });
    });

    it('malzeme seçimini 4\'ten 3\'e düşürünce submit disabled olur', () => {
      cy.get('input[name="name"]').type('Test Kullanıcı');
      cy.get('input[type="radio"][name="size"]').first().check({ force: true });
      cy.get('select[name="dough"]').select(1);
      cy.get('.orderpizza-checkbox-grid input[type="checkbox"]').then($checkboxes => {
        cy.wrap($checkboxes[0]).check({ force: true });
        cy.wrap($checkboxes[1]).check({ force: true });
        cy.wrap($checkboxes[2]).check({ force: true });
        cy.wrap($checkboxes[3]).check({ force: true });
        cy.wrap($checkboxes[3]).uncheck({ force: true });
      });
      cy.get('button[type="submit"]').should('be.disabled');
    });

    it('malzeme seçimini 4\'ten 5\'e çıkarınca submit enabled kalır', () => {
      cy.get('input[name="name"]').type('Test Kullanıcı');
      cy.get('input[type="radio"][name="size"]').first().check({ force: true });
      cy.get('select[name="dough"]').select(1);
      cy.get('.orderpizza-checkbox-grid input[type="checkbox"]').then($checkboxes => {
        cy.wrap($checkboxes[0]).check({ force: true });
        cy.wrap($checkboxes[1]).check({ force: true });
        cy.wrap($checkboxes[2]).check({ force: true });
        cy.wrap($checkboxes[3]).check({ force: true });
        cy.wrap($checkboxes[4]).check({ force: true });
      });
      cy.get('button[type="submit"]').should('not.be.disabled');
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
    it('Responsive: Mobilde form ve ana elemanlar görünür', () => {
  cy.viewport(375, 667);
  cy.visit('/');
  cy.get('.btn').contains('ACIKTIM').click();
  cy.get('.orderpizza-form').should('be.visible');
  cy.get('.orderpizza-checkbox-grid').should('be.visible');
  cy.get('.orderpizza-quantity-controls').should('be.visible');
});
  });
})