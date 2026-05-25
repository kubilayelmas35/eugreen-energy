/**
 * Wix Page Code – iframe element ID: html1
 * URL: https://kubilayelmas35.github.io/eugreen-energy/
 * CMS collection: EuGreenLeads
 */
import wixData from 'wix-data';

$w.onReady(function () {
  $w('#html1').onMessage((event) => {
    const data = event.data;
    if (!data || data.type !== 'EUGREEN_FORM_SUBMIT') return;

    const p = data.payload || {};

    wixData
      .insert('EuGreenLeads', {
        mode: p.mode || '',
        country: p.country || p.countrySelect || '',
        office: p.office || '',
        firstName: p.firstName || '',
        lastName: p.lastName || '',
        email: p.email || '',
        phone: p.phone || '',
        street: p.street || '',
        houseNumber: p.houseNumber || '',
        zip: p.zip || '',
        city: p.city || '',
        services: Array.isArray(p.services) ? p.services.join(', ') : '',
        consumption: p.consumption ? Number(p.consumption) : null,
        monthlyBill: p.monthlyBill ? Number(p.monthlyBill) : null,
        propertyType: p.propertyType || '',
        contactPreference: p.contactPreference || '',
        message: p.message || '',
        lang: p.lang || '',
        submittedAt: new Date()
      })
      .catch((err) => console.error('CMS insert failed', err));
  });
});
