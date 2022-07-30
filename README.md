# Lab 11

## Odd Duck Products

 The app’s purpose is to allow staff members choose which product, from three displayed images, that they would be most interested in seeing as a new creation. The app will store each anonymous vote, calculate totals, and visually display the results.

### Author: Tyler Main

### Links and Resources

### Reflections and Comments

Collaborated with Jose and Adriane for creating the while loop image generator that prevents repeat image rendering from round to round.

#### What do we need?

- Array of pics of products

#### Dom References

- Grab HTML elements that shows the picture of the products
- DOM manipulation to have JS render the products
- Grab our buttom
- DOM manipulation to render list of results

#### Constructor - What is our constructor? Objects to build

##### Product Objects

###### Properties

- votes
- name
- img of the products - path
- views - variable that tracks the amount of views
- Array to store our products

#### Global Variables

- Total votes

#### Executable Code

- Random img generator (selects 2 unique imgs)
- Event Listeners! (click - on the imgs - rerender new images (increase views on products that are rendered) - count the vote of the product that was clicked / lower total number of votes)
- click - "button" after # rounds show results
