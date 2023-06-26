const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const con = require('../../dbconfig/db');


Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}


exports.pay = async (req, res) => {

    try {
        con.query("select * from student_registration where registration_id = ?", [req?.body?.id], async (error, result) => {
            if (error) {
                console.log(error);
                res.status(400);
                res.send({
                    "error": error.sqlMessage
                });
                return res;
            }
            const { id } = req.body;

            if (!id) return res.status(400).json({ message: "No id in the request." });
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(9.99 * 100),
                currency: "inr",
                payment_method_types: ["card"],
                metadata: {
                    id,
                    payment: "subscribe",
                    subscription: "standard",
                    name: result[0].firstname + " " + result[0]?.lastname,
                },

                description: 'Subscription for Player Recruit application',

            });
            const clientSecret = paymentIntent.client_secret;
            res.json({ message: "Payment initiated", clientSecret });
        });
        return res;
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.platinum = async (req, res) => {

    try {
        con.query("select * from student_registration where registration_id = ?", [req?.body?.id], async (error, result) => {
            if (error) {
                console.log(error);
                res.status(400);
                res.send({
                    "error": error.sqlMessage
                });
                return res;
            }
            const { id } = req.body;

            if (!id) return res.status(400).json({ message: "No id in the request." });
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(14.99 * 100),
                currency: "inr",
                payment_method_types: ["card"],
                metadata: {
                    id,
                    payment: "subscribe",
                    subscription: "platinum",
                    name: result[0].firstname + " " + result[0]?.lastname,
                },

                description: 'Subscription for Player Recruit application',

            });
            const clientSecret = paymentIntent.client_secret;
            res.json({ message: "Payment initiated", clientSecret });
        });
        return res;
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.eventhandle = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
        event = await stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
    // Event when a payment is initiated
    if (event.type === "payment_intent.created") {
        console.log(`${event.data.object.metadata.name} initated payment!`);
    }
    // Event when a payment is succeeded
    if (event.type === "charge.succeeded") {
        if (event?.data?.object?.metadata?.payment === "subscribe") {
            var date = new Date();
            var subsdate = (date.addDays(30));
            console.log(subsdate);
            if (event?.data?.object?.metadata?.subscription == "standard") {
                con.query("UPDATE `student_registration` SET validity = ?, subscription=10,swipes=0 where registration_id = ?", [subsdate, event.data.object.metadata.id], (error, result) => {
                    if (error) {
                        console.log(error);
                    }
                });
            } else {
                con.query("UPDATE `student_registration` SET validity = ?, subscription=15,swipes=0 where registration_id = ?", [subsdate, event.data.object.metadata.id], (error, result) => {
                    if (error) {
                        console.log(error);
                    }
                });
            }

            console.log(`${event.data.object.metadata.name} succeeded payment!`);
            // fulfilment
        }
        else if (event?.data?.object?.metadata?.payment === "boost") {
            con.query("update student_registration set swipes = swipes - 5  where registration_id=?", [event.data.object.metadata.id], (err, result) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    }
    res.json({ ok: true });
}

exports.boost = async (req, res) => {

    try {
        con.query("select * from student_registration where registration_id = ?", [req.user?.user?.id], async (error, result) => {
            if (error) {
                console.log(error);
                res.status(400);
                res.send({
                    "error": error.sqlMessage
                });
                return res;
            }
            const id = req?.user?.user?.id;
            if (!id) return res.status(400).json({ message: "No id in the request." });
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(5 * 100),
                currency: "inr",
                payment_method_types: ["card"],
                metadata: {
                    id,
                    name: result[0].firstname + " " + result[0]?.lastname,
                    payment: "boost",
                    description: 'Boosting the swipes for Player Recruit application',
                },

            });
            const clientSecret = paymentIntent.client_secret;
            res.json({ message: "Payment initiated", clientSecret });
        });
        return res;
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}