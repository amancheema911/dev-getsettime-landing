export type FeaturePoint = {
  title: string;
  text: string;
};

export type FeatureFaq = {
  question: string;
  answer: string;
};

export type FeatureSection = {
  id: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  points: FeaturePoint[];
  imageClassName: string;
  imageAlt: string;
  caption: string;
  demoHref: string;
  demoLabel: string;
  demoNote: string;
  faqs: FeatureFaq[];
};

export const featureSections: FeatureSection[] = [
  {
    id: "online-booking",
    navLabel: "Online Booking",
    eyebrow: "Online booking",
    title: "A public page where customers book themselves",
    description:
      "Each workspace has a shareable booking link. Customers choose what they need, pick an open time, and leave their details. Staff can also create and update bookings from the workspace.",
    points: [
      {
        title: "Public booking pages",
        text: "Share a workspace link, a provider link, or a link for one event type. The page is the same booking flow customers use on the web.",
      },
      {
        title: "Service selection",
        text: "Customers choose a department, then a service or event type offered by the selected provider. A single bookable event type is selected for them.",
      },
      {
        title: "Appointment selection",
        text: "They pick a date and an open time. The times shown already follow the provider’s hours, breaks, duration, and existing bookings.",
      },
      {
        title: "Customer details and booking management",
        text: "The intake step collects the customer’s name and contact details, including an optional WhatsApp agreement. Staff can view, create, reschedule, and cancel bookings. Reschedule and cancellation follow the deadlines set on the event type.",
      },
    ],
    imageClassName: "object-right object-top",
    imageAlt:
      "GetSetTime workspace dashboard with a live public booking preview, open time slots, and a Book Appointment button.",
    caption: "Workspace dashboard with the live public booking preview.",
    demoHref: "/app-functionality-demo-video",
    demoLabel: "Watch the booking walkthrough",
    demoNote:
      "Recorded setup and test of a real GetSetTime booking page, from configuration through a completed appointment.",
    faqs: [
      {
        question: "How does a customer book an appointment?",
        answer:
          "They open the public booking link, choose a department, choose a provider when more than one is available, pick the service or event type, choose an open date and time, and enter their contact details.",
      },
      {
        question: "Does GetSetTime assign a provider automatically?",
        answer:
          "No. The customer chooses the provider when the department has more than one. If only one provider is available for that booking, that provider is used.",
      },
      {
        question: "Can a booking be changed after it is made?",
        answer:
          "Yes, when the event type allows rescheduling or cancellation, and the request is inside the deadline set for that event type. Staff can also update the booking from the workspace. Confirmation, reschedule, and cancellation emails are sent for those changes.",
      },
    ],
  },
  {
    id: "team-management",
    navLabel: "Team Management",
    eyebrow: "Team management",
    title: "Staff, services, and a calendar for the whole team",
    description:
      "Add the people who take appointments, group them into departments, and attach the services they offer. The workspace calendar shows those bookings in one place.",
    points: [
      {
        title: "Staff management",
        text: "Invite team members and give them a role such as workspace admin, manager, service provider, or staff. Providers can keep their own availability and notification settings.",
      },
      {
        title: "Provider choice",
        text: "Customers pick a provider on the booking page when more than one provider is assigned to the department. Staff can also choose the provider when they create a booking.",
      },
      {
        title: "Service management",
        text: "Services and event types live in the workspace catalog. An event type can be limited to the providers who offer it, and each of those providers can have a public link.",
      },
      {
        title: "Team calendars",
        text: "The calendar has day, week, month, and provider views. Bookings can be filtered by department, service, and provider.",
      },
    ],
    imageClassName: "object-left object-top",
    imageAlt:
      "GetSetTime dashboard sidebar with Team Members, Departments, Services, Calendar, and Bookings.",
    caption: "Team Members, Departments, Services, and Calendar are in the same workspace.",
    demoHref: "/app-functionality-demo-video",
    demoLabel: "Watch how a configured team appears on the booking page",
    demoNote:
      "The booking walkthrough uses the services and providers already set up in the workspace, which is what customers see on the public page.",
    faqs: [
      {
        question: "What can I set up for my team?",
        answer:
          "You can add team members, departments, services, and event types. Each service provider can have a booking link, separate working hours, and separate notification settings.",
      },
      {
        question: "How do customers choose who they book with?",
        answer:
          "When a department has more than one provider, the booking page asks the customer to choose one. The services shown are the ones assigned to that provider.",
      },
      {
        question: "Can I see every provider’s appointments together?",
        answer:
          "Yes. The workspace calendar lists bookings in day, week, month, and provider views, and it can be filtered by department, service, or provider.",
      },
    ],
  },
  {
    id: "availability",
    navLabel: "Availability",
    eyebrow: "Availability management",
    title: "Hours, breaks, and durations that decide which slots are open",
    description:
      "Customers only see times that fit the schedule you save. Each provider can keep a different weekly schedule, and a booking is rejected when it overlaps an existing appointment.",
    points: [
      {
        title: "Working hours",
        text: "Set each day on or off, with a start and end time. Providers can keep a schedule that is separate from the rest of the workspace.",
      },
      {
        title: "Breaks and blocked time",
        text: "Add breaks inside a working day. Date exceptions can close a day, block part of a day, or apply special hours.",
      },
      {
        title: "Appointment duration",
        text: "Each event type has a duration in minutes, plus optional buffer time before and after the appointment.",
      },
      {
        title: "Conflict checks",
        text: "A slot is withheld when it overlaps another booking, a break, a closed exception, or the buffer around an appointment. If Google Calendar is connected, busy time on that calendar is checked as well.",
      },
    ],
    imageClassName: "object-[70%_80%]",
    imageAlt:
      "GetSetTime dashboard calendar snapshot used to review upcoming bookings against the workspace schedule.",
    caption: "The calendar snapshot sits next to availability in the workspace.",
    demoHref: "/app-functionality-demo-video",
    demoLabel: "Watch a customer choose an open time",
    demoNote:
      "The booking walkthrough includes the date and time step, which only offers slots that pass these availability rules.",
    faqs: [
      {
        question: "What decides which times a customer can book?",
        answer:
          "Weekly working hours, breaks, date exceptions, the event type duration, and buffer time before and after the appointment. Times that overlap an existing booking are not offered.",
      },
      {
        question: "Can each provider have different hours?",
        answer:
          "Yes. Availability is stored for each service provider, so one person’s working days, breaks, and time off do not have to match the rest of the team.",
      },
      {
        question: "What happens if Google Calendar already has something at that time?",
        answer:
          "When Google Calendar is connected, GetSetTime checks the busy times on that calendar before accepting a slot. Overlapping busy time is treated as unavailable.",
      },
    ],
  },
  {
    id: "reminders",
    navLabel: "Reminders",
    eyebrow: "Reminders and notifications",
    title: "Confirmations, reminders, and updates when a booking changes",
    description:
      "A new booking sends confirmation email to the customer and the provider. Later reminders and WhatsApp messages go out only when those notifications are turned on for the workspace or the provider.",
    points: [
      {
        title: "Booking confirmations",
        text: "Creating a booking sends a confirmation email to the customer and to the provider, with the appointment time in the relevant timezone.",
      },
      {
        title: "Email, SMS, and WhatsApp reminders",
        text: "An email reminder is sent about 24 hours before when that reminder is on. An SMS reminder and a WhatsApp reminder are sent about one hour before when each of those channels is on and the booking has a phone number.",
      },
      {
        title: "Reschedule and cancellation updates",
        text: "Rescheduling or cancelling sends email to the people on the booking. WhatsApp reschedule and cancellation messages are sent when WhatsApp notifications are enabled.",
      },
      {
        title: "Follow-up and manual reminders",
        text: "A follow-up email can be sent after a completed appointment when that notification is on. Staff can also send a reminder from the booking itself.",
      },
    ],
    imageClassName: "object-center object-top",
    imageAlt:
      "GetSetTime workspace overview showing WhatsApp reminders set up and email reminders active.",
    caption: "Reminder status for WhatsApp and email is shown on the workspace overview.",
    demoHref: "/googlemeet-link-functionality",
    demoLabel: "Watch the booking email notification",
    demoNote:
      "This walkthrough books an appointment and shows the email notification that carries the Google Meet join link.",
    faqs: [
      {
        question: "Which messages are sent when someone books?",
        answer:
          "GetSetTime sends a confirmation email to the customer and to the provider. If WhatsApp notifications are enabled and the booking has a phone number, a WhatsApp booking message can be sent as well. The booking form includes a checkbox for the customer to agree to WhatsApp appointment and reminder messages.",
      },
      {
        question: "When do reminders go out?",
        answer:
          "The email reminder is sent about 24 hours before the appointment when the email reminder is turned on. The SMS reminder and the WhatsApp reminder are sent about one hour before when those notifications are turned on and the booking has a phone number.",
      },
      {
        question: "Are customers told if the appointment is rescheduled or cancelled?",
        answer:
          "Yes. Reschedule and cancellation send email updates. WhatsApp messages for those changes are sent when WhatsApp notifications are enabled for that workspace or provider.",
      },
    ],
  },
  {
    id: "integrations",
    navLabel: "Integrations",
    eyebrow: "Integrations",
    title: "Google Calendar and Google Meet, connected to the booking",
    description:
      "Google Calendar and Google Meet are the scheduling connections used while a booking is created or changed. Email, SMS, and WhatsApp send appointment messages when those notifications are turned on.",
    points: [
      {
        title: "Google Calendar connection",
        text: "A workspace or a service provider connects Google Calendar with their Google account. The connection is stored for that workspace or provider and can be disconnected later.",
      },
      {
        title: "Bookings are written to the calendar",
        text: "A new booking creates an event on the connected calendar. Rescheduling updates that event. Cancelling removes it.",
      },
      {
        title: "Busy time is read back",
        text: "Before a slot is offered, GetSetTime reads busy time from the connected calendar and withholds overlapping times. A change made only inside Google Calendar stays on that calendar and is not copied back into the booking record.",
      },
      {
        title: "Google Meet on video appointments",
        text: "When the appointment is a video meeting and Google Calendar is connected, GetSetTime adds a Meet link to the calendar event, saves it on the booking, and emails the join link.",
      },
    ],
    imageClassName: "object-[62%_28%]",
    imageAlt:
      "GetSetTime workspace overview with Google Calendar marked connected next to WhatsApp and email reminder status.",
    caption: "Google Calendar shows as connected after the account is linked.",
    demoHref: "/google-meet-link-functionality",
    demoLabel: "Watch the Google Meet setup",
    demoNote:
      "This walkthrough sets up a booking that creates a Google Meet link through the connected calendar.",
    faqs: [
      {
        question: "What does the Google Calendar connection actually do?",
        answer:
          "After Google Calendar is connected, a new booking is added to that calendar, a reschedule updates the event, and a cancellation removes it. Busy times already on the calendar are checked so those slots are not offered. An edit made only in Google Calendar is not written back into the GetSetTime booking.",
      },
      {
        question: "How does Google Meet get onto an appointment?",
        answer:
          "If the appointment location is a video meeting and Google Calendar is connected, GetSetTime creates the Meet link on the calendar event, stores it on the booking, and sends it by email.",
      },
      {
        question: "Which connections are part of a live booking?",
        answer:
          "Google Calendar and Google Meet are the scheduling connections used while a booking is created or changed. Email, SMS, and WhatsApp are notification channels and send only when their settings are turned on.",
      },
    ],
  },
];

export const solutionLinks = [
  {
    href: "/solutions/doctor-appointment-scheduling-software",
    label: "Doctors",
  },
  {
    href: "/solutions/dentist-appointment-scheduling-software",
    label: "Dentists",
  },
  {
    href: "/solutions/dermatology-appointment-scheduling-software",
    label: "Dermatology",
  },
  {
    href: "/solutions/physiotherapist-appointment-booking-software",
    label: "Physiotherapy",
  },
  {
    href: "/solutions/salon-appointment-scheduling-software",
    label: "Salons",
  },
  {
    href: "/solutions/tutor-appointment-booking-software",
    label: "Tutors",
  },
] as const;

export const productDemos = [
  {
    href: "/app-functionality-demo-video",
    title: "Set up and test a booking",
    description:
      "A recorded walkthrough of configuring GetSetTime and completing a booking on the public page.",
    embed:
      "https://scribehow.com/embed/How_To_Set_Up_And_Test_Appointment_Booking_On_GetSetTime__coqN7VU6TiOqCh0iMI0-pw?as=video",
    embedTitle: "GetSetTime appointment booking setup and test walkthrough",
  },
  {
    href: "/google-meet-link-functionality",
    title: "Add a Google Meet link",
    description:
      "A recorded walkthrough of setting up a booking so the calendar event includes a Google Meet link.",
    embed: null,
    embedTitle: null,
  },
  {
    href: "/googlemeet-link-functionality",
    title: "Booking email with the Meet link",
    description:
      "A recorded walkthrough of booking an appointment and receiving the email notification with the join link.",
    embed: null,
    embedTitle: null,
  },
] as const;
