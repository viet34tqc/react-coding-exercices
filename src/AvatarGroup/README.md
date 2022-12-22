## AvatarGroup Component

Can set maximum of displayed total avatar.
If data has no image then print the initial, eg: Pedro Tech shows as "PT" and max length of initial is 2.
if data length is bigger than maximum, print +{number} for the avatar(s) that are not displayed.

## Unit Test Criteria

default component should render properly
each props should be test as expected
capture a component as snapshot file

## Expected Props

maxLength // maximum of component avatar to display
size // size of avatar | expectation xs | sm | md | lg
