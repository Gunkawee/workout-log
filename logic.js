(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Logic = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  const DAY = 86400000;
  const toUtc = (s) => Date.parse(s + 'T00:00:00Z');
  const fmt = (ms) => new Date(ms).toISOString().slice(0, 10);

  function weekStart(date) {
    const ms = toUtc(date);
    const dow = (new Date(ms).getUTCDay() + 6) % 7; // Monday = 0
    return fmt(ms - dow * DAY);
  }

  function entryFor(session, exerciseId) {
    return session.entries.find((e) => e.exerciseId === exerciseId);
  }

  function previousEntry(sessions, exerciseId, beforeDate) {
    let best = null;
    for (const s of sessions) {
      if (s.date >= beforeDate) continue;
      const e = entryFor(s, exerciseId);
      if (!e) continue;
      if (!best || s.date >= best.date) best = { date: s.date, sets: e.sets };
    }
    return best;
  }

  function shouldIncrease(prevSets, repMax, targetSets) {
    return prevSets.length >= targetSets && prevSets.every((s) => s.reps >= repMax);
  }

  const num = (v) => (typeof v === 'string' ? Number(v.trim().replace(',', '.')) : Number(v));

  function cleanSets(sets) {
    const out = [];
    for (const s of sets) {
      const kg = s.kg === '' || s.kg == null ? NaN : num(s.kg);
      const reps = s.reps === '' || s.reps == null ? NaN : num(s.reps);
      if (Number.isFinite(kg) && Number.isFinite(reps) && kg >= 0 && reps > 0) out.push({ kg, reps });
    }
    return out;
  }

  function weeklyStats(sessions, exerciseId) {
    const weeks = new Map();
    for (const s of sessions) {
      const e = entryFor(s, exerciseId);
      if (!e) continue;
      const w = weekStart(s.date);
      const row = weeks.get(w) || { week: w, topKg: 0, volume: 0 };
      for (const set of e.sets) {
        row.topKg = Math.max(row.topKg, set.kg);
        row.volume += set.kg * set.reps;
      }
      weeks.set(w, row);
    }
    return [...weeks.values()].sort((a, b) => (a.week < b.week ? -1 : 1));
  }

  const isObj = (o) => o !== null && typeof o === 'object' && !Array.isArray(o);
  const isStr = (v) => typeof v === 'string';
  const isNum = (v) => typeof v === 'number' && Number.isFinite(v);
  const filled = (v) => v !== '' && v != null;

  function partialSets(sets) {
    return sets.filter((s) => filled(s.kg) !== filled(s.reps)).length;
  }

  function validPlan(plan) {
    if (!Array.isArray(plan) || plan.length !== 5) return false;
    const days = new Set();
    for (const d of plan) {
      if (!isObj(d) || !Number.isInteger(d.day) || d.day < 1 || d.day > 5 || !isStr(d.title)) return false;
      if (!isObj(d.cardio) || !isStr(d.cardio.label) || !isStr(d.cardio.minutes) || !Array.isArray(d.exercises)) return false;
      days.add(d.day);
      for (const e of d.exercises) {
        if (!isObj(e) || !isStr(e.id) || !isStr(e.name) || !isNum(e.sets) || !isNum(e.repMin) || !isNum(e.repMax)) return false;
        if (e.alts !== undefined && !(Array.isArray(e.alts) && e.alts.every((a) => isObj(a) && isStr(a.id) && isStr(a.name)))) return false;
      }
    }
    return days.size === 5;
  }

  function validSession(s) {
    if (!isObj(s) || !isStr(s.id) || !isStr(s.date) || !/^\d{4}-\d{2}-\d{2}$/.test(s.date) || !Number.isInteger(s.day)) return false;
    if (!isObj(s.cardio) || !Array.isArray(s.entries)) return false;
    return s.entries.every((e) => isObj(e) && isStr(e.exerciseId) && isStr(e.name) && Array.isArray(e.sets)
      && e.sets.every((x) => isObj(x) && isNum(x.kg) && x.kg >= 0 && isNum(x.reps) && x.reps > 0));
  }

  function validateImport(obj) {
    const bad = { ok: false, error: 'ไฟล์ไม่ถูกต้อง: ไม่ใช่ไฟล์สำรองของแอปนี้' };
    if (!isObj(obj) || obj.version !== 1 || !validPlan(obj.plan) || !Array.isArray(obj.sessions) || !obj.sessions.every(validSession)) return bad;
    return { ok: true, store: obj };
  }

  function idForName(plan, sessions, name) {
    const n = String(name).trim().toLowerCase();
    if (!n) return null;
    for (const d of plan) for (const e of d.exercises) {
      if (e.name.trim().toLowerCase() === n) return e.id;
      for (const a of e.alts || []) if (a.name.trim().toLowerCase() === n) return a.id;
    }
    for (const s of sessions) for (const e of s.entries) if (e.name.trim().toLowerCase() === n) return e.exerciseId;
    return null;
  }

  return { weekStart, previousEntry, shouldIncrease, cleanSets, partialSets, weeklyStats, validateImport, idForName };
});
