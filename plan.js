(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.PLAN = factory().PLAN;
})(typeof self !== 'undefined' ? self : this, function () {
  const ex = (id, name, sets, repMin, repMax, alts) => {
    const e = { id, name, sets, repMin, repMax };
    if (alts) e.alts = alts;
    return e;
  };
  const alt = (id, name) => ({ id, name });

  const PLAN = [
    {
      day: 1, title: 'อก (Chest)',
      exercises: [
        ex('d1-bench', 'Bench Press', 4, 8, 10, [alt('d1-bench-bb', 'Barbell Bench Press'), alt('d1-bench-db', 'Dumbbell Bench Press')]),
        ex('d1-incline', 'Incline Dumbbell Press', 3, 8, 12),
        ex('d1-fly', 'Cable Fly / Pec Deck', 3, 12, 15, [alt('d1-fly-cable', 'Cable Fly'), alt('d1-fly-pec', 'Pec Deck')]),
        ex('d1-dips', 'Dips / Decline Press', 3, 10, 12, [alt('d1-dips-dips', 'Dips'), alt('d1-dips-decline', 'Decline Press')]),
      ],
      cardio: { label: 'เดินชันบนลู่ หรือ ปั่นจักรยาน', minutes: '25–30' },
    },
    {
      day: 2, title: 'หลัง (Back)',
      exercises: [
        ex('d2-pulldown', 'Lat Pulldown', 4, 8, 12),
        ex('d2-row', 'Barbell / Dumbbell Row', 4, 8, 10, [alt('d2-row-bb', 'Barbell Row'), alt('d2-row-db', 'Dumbbell Row')]),
        ex('d2-cable-row', 'Seated Cable Row', 3, 10, 12),
        ex('d2-straight-arm', 'Straight-Arm Pulldown', 3, 12, 15),
      ],
      cardio: { label: 'เดินชันบนลู่ หรือ ปั่นจักรยาน', minutes: '25–30' },
    },
    {
      day: 3, title: 'ไหล่ (Shoulders)',
      exercises: [
        ex('d3-ohp', 'Overhead Press', 4, 8, 10, [alt('d3-ohp-bb', 'Overhead Barbell Press'), alt('d3-ohp-db', 'Overhead Dumbbell Press')]),
        ex('d3-lateral', 'Dumbbell Lateral Raise', 4, 12, 15),
        ex('d3-rear', 'Reverse Pec Deck / Rear Delt Fly', 3, 12, 15, [alt('d3-rear-pec', 'Reverse Pec Deck'), alt('d3-rear-fly', 'Rear Delt Fly')]),
        ex('d3-shrug', 'Dumbbell Shrugs', 3, 12, 15),
      ],
      cardio: { label: 'เดินชันบนลู่ หรือ ปั่นจักรยาน', minutes: '25–30' },
    },
    {
      day: 4, title: 'แขน + ท้อง (Arms & Abs)',
      exercises: [
        ex('d4-curl', 'Barbell / EZ-Bar Curl', 3, 8, 12, [alt('d4-curl-bb', 'Barbell Curl'), alt('d4-curl-ez', 'EZ-Bar Curl')]),
        ex('d4-pushdown', 'Triceps Rope Pushdown', 3, 10, 12),
        ex('d4-incline-curl', 'Incline Dumbbell Curl', 3, 10, 12),
        ex('d4-overhead-tri', 'Overhead Triceps Extension', 3, 10, 12),
        ex('d4-abs', 'Hanging Leg Raise / Cable Crunch', 3, 12, 15, [alt('d4-abs-hang', 'Hanging Leg Raise'), alt('d4-abs-crunch', 'Cable Crunch')]),
      ],
      cardio: { label: 'เดินชันบนลู่ หรือ ปั่นจักรยาน', minutes: '25–30' },
    },
    {
      day: 5, title: 'ขา (Legs)',
      exercises: [
        ex('d5-squat', 'Squat / Leg Press', 4, 8, 10, [alt('d5-squat-squat', 'Squat'), alt('d5-squat-press', 'Leg Press')]),
        ex('d5-rdl', 'Romanian Deadlift', 3, 8, 10),
        ex('d5-ext', 'Leg Extension', 3, 12, 15),
        ex('d5-curl', 'Lying / Seated Leg Curl', 3, 12, 15, [alt('d5-curl-lying', 'Lying Leg Curl'), alt('d5-curl-seated', 'Seated Leg Curl')]),
        ex('d5-calf', 'Standing Calf Raise', 3, 12, 15),
      ],
      cardio: { label: 'ปั่นจักรยานแรงต้านเบา', minutes: '20–25' },
    },
  ];

  return { PLAN };
});
