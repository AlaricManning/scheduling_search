export const constraintTemplates = [
  {
    id: 1,
    name: "Game Scheduling Constraints",
    template: "Ensure that at least {min} and at most {max} games from {games} are scheduled across {rounds} and played in any venue from {venues} and assigned to any of {networks}.",
    examples: [
      "Ensure all rivalry games on a weekend on ESPN",
      "Put every big rivalry game on Saturday or Sunday on ESPN",
      "Schedule all marquee matchups on weekends with ESPN coverage"
    ]
  },
  {
    id: 2,
    name: "Avoid Weekday High-Profile Games",
    template: "No games from {games} should be scheduled on {rounds}.",
    examples: [
      "Don't schedule high profile games on a weekday",
      "No marquee games on Monday through Thursday"
    ]
  },
  {
    id: 3,
    name: "Rivalry Finale Constraint",
    template: "At least {min} of the games in {games} must be scheduled on {rounds} and on {networks}.",
    examples: [
      "At least 2 of UTN@VU, ALA@AU, MSU@UM should all be scheduled on the final 2 dates of the season and on either CBS or ESPN"
    ]
  },
  {
    id: 4,
    name: "No Weekday Byes",
    template: "Teams in {teams} must not have byes on {rounds}.",
    examples: [
      "Make sure UTN, UK, USC, LSU do not have any weekday byes"
    ]
  }
]