const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = req.body;

    await resend.emails.send({
      from: 'Brightspire Leads <onboarding@resend.dev>', 
      to: ['YOUR_EMAIL@example.com'], // <<< REPLACE WITH YOUR VERIFIED EMAIL
      subject: `New Fit Assessment Lead: ${data.contact_name}`,
      html: `
        <h1>New Fit Assessment Lead</h1>
        <p><strong>Name:</strong> ${data.contact_name}</p>
        <p><strong>Email:</strong> ${data.contact_email}</p>
        <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
        <hr>
        <h2>Assessment Results</h2>
        <p><strong>Fit Score:</strong> ${data.spire_fit_score}</p>
        <p><strong>Fit Band:</strong> ${data.spire_fit_band}</p>
        <p><strong>Recommended Package:</strong> ${data.recommended_package}</p>
        <hr>
        <h3>Full Details:</h3>
        <pre>${JSON.stringify(data.full_answers, null, 2)}</pre>
      `,
    });

    res.status(200).json({ message: 'Success!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};