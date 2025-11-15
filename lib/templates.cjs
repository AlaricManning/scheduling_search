// lib/templates.cjs
const constraintTemplates = [
  {
    id: 1,
    name: "Game Scheduling Constraints",
    template: "Ensure that at least {min} and at most {max} games from {games} are scheduled across {rounds} and played in any venue from {venues} and assigned to any of {networks}.",
    examples: [
      "Ensure all rivalry games on a weekend on ESPN",
      "Put every big rivalry game on Saturday or Sunday on ESPN",
      "Schedule all marquee matchups on weekends with ESPN coverage",
      "Place every top-10 clash on national TV during Weeks 10-12",
      "Require at least 4 ACC-SEC crossover games on ABC or ESPN",
      "All Bedlam and Iron Bowl games must be on Saturday afternoons",
      "Need at least 3 rivalry games per weekend on CBS or FOX",
      "No more than 2 marquee games per Saturday on ESPN",
      "All Big Ten-SEC games must air on CBS or ESPN",
      "At least 5 Power-5 vs. Group-of-5 games on Thursday nights",
      "Every Army-Navy game must be on a Saturday on CBS",
      "Schedule at least 2 neutral-site games on FOX in November",
      "All Pac-12 championship rematches must be on ESPN",
      "Require at least 1 non-conference game per week on ABC",
      "No more than 1 Thursday night game per team on ESPN",
      "All rivalry week games must be on ESPN or CBS",
      "At least 6 conference championship games on network TV",
      "Every bowl-eligible team must have a Saturday game on ABC",
      "All Friday night games must be on ESPN or FS1",
      "Require at least 3 night games per team on ESPN"
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
      "At least 2 of UTN@VU, ALA@AU, MSU@UM should all be scheduled on the final 2 dates of the season and on either CBS or ESPN",
      "Schedule at least 3 of the big rivalries in the last two weeks on CBS or ESPN",
      "Make sure 2+ rivalry games are in the final weekend on national TV",
      "At least two of the big three rivalries in the final two rounds on CBS/ESPN",
      "Require at least 1 of Army-Navy, Michigan-Ohio State on the last Saturday on ABC",
      "At least 3 of the Iron Bowl, Bedlam, Civil War on the final weekend on ESPN",
      "All four major rivalry games must be in the last two weeks on network TV",
      "At least 2 of the Red River, Apple Cup on the final Saturday on FOX",
      "Require at least 1 of the Egg Bowl, Palmetto Bowl on Thanksgiving weekend on CBS",
      "At least 3 of the Big Game, Lone Star Showdown on the last weekend on ESPN",
      "All rivalry games must be in the final two weeks on ABC or CBS",
      "At least 2 of the Backyard Brawl, Holy War on the last Saturday on ESPN",
      "Require at least 1 of the Florida-Georgia, Auburn-Alabama on the final weekend on CBS",
      "At least 3 of the Border War, Sunflower Showdown on the last two weeks on FOX",
      "All four major in-state rivalries must be on the final weekend on network TV",
      "At least 2 of the Clean Old-Fashioned Hate, Deep South’s Oldest Rivalry on the last Saturday on ESPN",
      "Require at least 1 of the Third Saturday in October, World’s Largest Outdoor Cocktail Party on the final weekend on CBS",
      "At least 3 of the Paul Bunyan Trophy, Little Brown Jug on the last two weeks on ABC",
      "All rivalry games must be on the final two Saturdays on ESPN or CBS",
      "At least 2 of the Battle of the Brothers, Crabtree Trophy on the last weekend on FOX"
    ]
  },
  {
    id: 4,
    name: "No Weekday Byes",
    template: "Teams in {teams} must not have byes on {rounds}.",
    examples: [
      "Make sure UTN, UK, USC, LSU do not have any weekday byes",
      "No byes for blue-blood teams on weekdays",
      "UTN, UK, USC, LSU cannot have byes on Mon-Thu",
      "Ensure top teams don't rest on weekdays",
      "Blue-bloods must play on weekdays or not at all",
      "No weekday byes for Alabama, Ohio State, Michigan, Notre Dame",
      "All Power-5 teams must avoid byes on Monday-Thursday",
      "Prevent any SEC team from having a bye on a weekday",
      "No ACC team can have a bye on a non-Saturday",
      "All Big Ten teams must avoid weekday rest",
      "No Pac-12 team may have a bye on a weekday",
      "All Group-of-5 teams must avoid Monday-Thursday byes",
      "No FCS team can have a bye on a weekday",
      "All playoff-contending teams must avoid weekday rest",
      "No team ranked in the AP Top 25 can have a weekday bye",
      "All bowl-bound teams must avoid byes on non-Saturday",
      "No team with a winning record can have a weekday bye",
      "All conference championship contenders must avoid weekday rest",
      "No team with 8+ wins can have a bye on a weekday",
      "All teams in the playoff hunt must avoid Monday-Thursday byes"
    ]
  },
  {
    id: 5,
    name: "Sequence Constraints",
    template: "Ensure at least {min} and at most {max} cases where there is a sequence {sequence_items} across rounds {rounds}.",
    examples: [
      "Make sure Oregon, Washington, UCLA, USC do not play at home on either side of their bye week",
      "Make sure Penn State plays at UCLA and at USC in back-to-back weeks in the second half of the season",
      "Prevent any team from playing three road games in a row after Week 6",
      "Guarantee Texas plays Oklahoma and Texas A&M in consecutive weeks",
      "No team should have a bye followed by two away games",
      "Require at least one instance of Michigan-Ohio State followed by a bye",
      "Avoid back-to-back home games for any team in the final 3 rounds",
      "No team may have three consecutive away games in November",
      "All rivalry games must be followed by a bye week",
      "Prevent any team from having a bye sandwiched between two road games",
      "Require at least two instances of a team playing a rival then a bye",
      "No team can have a home game followed by two away games",
      "All teams must avoid three games in a row without a home contest",
      "Require at least one case of a team playing a rival then resting",
      "No team may have a bye followed by a Thursday night game",
      "All teams must avoid two byes within three weeks",
      "Require at least one instance of a team playing a rival on a Saturday then resting",
      "No team can have a bye followed by a Monday night game",
      "All teams must avoid three consecutive games without a bye",
      "Require at least two cases of a team playing a rival then having a bye"
    ]
  },
  {
      id: 6,
      name: "Team Schedule Pattern Constraints",
      template: "Ensure that {each_of_all} teams in {teams} have at least {min} and at most {max} instances where they play at least {k} and at most {m} {game_types} games across {rounds} where the game is assigned to any of {networks} and played in any venue from {venues}.",
      examples: [
      "No cases of 3 games in 3 nights for any NBA team",
      "No cases of 5 away games in 7 nights after the all star break",
      "At most 2 cases of 3 away games in 4 rounds for Western Conference teams",
      "No team should have more than 3 home games in 4 weeks",
      "Every Big Ten team must have at least 1 bye in the first 6 weeks",
      "Limit Western Conference teams to 2 instances of 4 games in 5 nights",
      "All Power 5 teams must have at most 1 Thursday game per season",
      "Ensure no Eastern Conference team has 3+ road games in 6 days",
      "No team may have more than 2 back-to-back road games after Week 8",
      "All SEC teams must have at most 1 Friday game per season",
      "Every ACC team must have at least 1 open date in the first half",
      "No Big 12 team can have 4 away games in 5 weeks",
      "All Pac-12 teams must avoid 3 home games in a row",
      "No Mountain West team may have more than 2 Thursday games",
      "Every FBS team must have at most 1 bye in the final 4 weeks",
      "All playoff-bound teams must avoid 3 road games in 4 weeks",
      "No team ranked in the CFP Top 25 can have 4 games in 5 nights",
      "All bowl-eligible teams must have at least 1 bye before Week 10",
      "No team may have more than 2 night games in 3 weeks",
      "Every team must avoid 3 consecutive away games in October"
      ]
    },
{
    id: 7,
    name: "Home/Away Balance",
    template: "Ensure that each team in {teams} does not have more than {max} consecutive home or away games in {rounds}.",
    examples: [
      "No team should have more than 3 consecutive home games",
      "Avoid 4 away games in a row for any team"
    ]
  },
  {
    id: 8,
    name: "Network Coverage Constraints",
    template: "Schedule games from {games} so that at least {min} games appear on {networks}.",
    examples: [
      "Ensure at least 2 marquee games on ESPN each week",
      "Put at least 3 rivalry games on CBS over the season"
    ]
  },
  {
    id: 9,
    name: "Venue Usage Constraints",
    template: "Ensure that no venue in {venues} is used more than {max} times in {rounds}.",
    examples: [
      "Do not schedule more than 2 games at Madison Square Garden per week",
      "Ensure each stadium is used at most 5 times in the first half of the season"
    ]
  },
  {
    id: 10,
    name: "Team Rest Days",
    template: "Ensure that teams in {teams} have at least {min} rest days between games in {rounds}.",
    examples: [
      "Each team should have at least 2 rest days between games",
      "No back-to-back games for any team without a minimum 1-day rest"
    ]
  },
  {
    id: 11,
    name: "Avoid Conflicting Events",
    template: "Do not schedule games in {venues} on {rounds} that conflict with {events}.",
    examples: [
      "Do not schedule NBA games at MSG on concert nights",
      "Avoid baseball games on stadium renovation dates"
    ]
  },
  {
    id: 12,
    name: "Consecutive Round Limit",
    template: "Ensure that {teams} do not play more than {max} consecutive rounds against the same opponent(s) in {rounds}.",
    examples: [
      "No team should play the same opponent more than twice in a row",
      "Avoid scheduling repeated matchups for 3 consecutive rounds"
    ]
  },
  {
    id: 13,
    name: "Holiday Game Restrictions",
    template: "Ensure that no games from {games} are scheduled on holidays {holidays} unless explicitly allowed.",
    examples: [
      "Do not schedule NFL games on Christmas Day unless necessary",
      "Avoid college basketball games on Thanksgiving unless specified"
    ]
  },
  {
    id: 14,
    name: "Prime Time Scheduling",
    template: "Schedule at least {min} games from {games} in prime time slots {slots} on {networks}.",
    examples: [
      "Ensure at least 2 rivalry games are in prime time on ESPN",
      "Schedule at least 3 marquee matchups on Monday night football"
    ]
  },
  {
    id: 15,
    name: "Consecutive Venue Constraint",
    template: "Ensure that no team in {teams} plays in the same venue from {venues} more than {max} consecutive times.",
    examples: [
      "No team should play at Madison Square Garden more than 2 times in a row",
      "Avoid repeating the same stadium for 3 consecutive away games"
    ]
  }
]

module.exports = { constraintTemplates }