# Bonus Tasks

## Design the strategy to manage and track changes to the pipeline statuses of targets. Consider the database schema, data update strategy, etc.

- I have updated the schema to keep track of status changes. I have added a new parameter "updates" as Array in which it has parameters such as "prevStatus", "newStatus" and "time".

## Identify any non-trivial edge cases with the implemented features and how you would handle them.

- I have identified edge cases around pipeline status - which can be null. I have handled it at frontend side with abbreviation "No Status".
