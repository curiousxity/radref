# Neonatal chest X-ray

Date: 2026-11-01 · Branch: `claude/xray-studies`

## Intent

The author asked for a study page for "baby x-rays" and chose the neonatal (NICU) chest radiograph
(2026-11-01). Step 1 picks why the film was taken, as the skull base study picks its exam and
history: a lines and tubes check, respiratory distress, or both (the usual NICU film), plus preterm
or term, which changes the likely diagnosis. No calculator.

## Goals

1. `/studies/neonatal-chest-xray` on the study framework (Report, Learn and Quiz tabs), a members
   page (`membersPage`), listed under Chest.
2. Written the way the larynx, skull base and brachial plexus studies were: every reference
   matched on PubMed and Crossref as it is cited, every claim read in an abstract or open full text
   before it goes in, with the quotes in
   `docs/superpowers/research/2026-11-01-neonatal-chest-xray-sources.md`. Prefer peer-reviewed
   radiology and neonatology reviews and guidelines; no Radiopaedia, Wikipedia or textbooks.
3. The source note starts "Every reference was matched…", with no "Unchecked draft".

## Non-goals

- Example scans (a separate pass).
- Older infants and children; the abdomen beyond what shows on a chest film (no NEC study here).
- Management beyond what a source states (for example, how far to pull back a tube is a
  measurement the report gives, not an instruction).

## Search pattern

1. Why the film, gestation (preterm or term) and age in days.
2. Technique: AP supine, rotation, inspiration (rib count), exposure; what to say when a film is
   rotated or expiratory.
3. Lines and tubes, each with its tip position by vertebral level and the usual malpositions:
   endotracheal tube, umbilical venous catheter, umbilical arterial catheter (high or low),
   nasogastric or orogastric tube, PICC, chest drain. The form records each tip's level; chips say
   whether it is in the sourced range.
4. Lungs: volumes and pattern; respiratory distress syndrome, transient tachypnoea of the newborn,
   meconium aspiration, neonatal pneumonia, bronchopulmonary dysplasia; surfactant-related change
   only as far as a source states it.
5. Air leak: pneumothorax (including on a supine film), pulmonary interstitial emphysema,
   pneumomediastinum, pneumopericardium.
6. Heart, thymus and mediastinum; the upper abdomen and bowel gas in view; bones; congenital
   lesions only where a source names the radiograph sign (for example a congenital diaphragmatic
   hernia).
7. Impression: lines and tubes first, then the lungs, then anything urgent.

## Calls made for the builder

- Tip ranges are given exactly as the cited source states them; where sources disagree, both are
  given, cited, and the chip uses the more widely cited one, saying so.
- Diagnoses are suggested by pattern in the chips ("pattern of…"), not asserted in the impression,
  unless the source treats the sign as diagnostic.
