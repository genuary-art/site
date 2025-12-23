# GENUARY Day 22 -- Pen plotter Ready

## What's a plotter?

It's a drawing robot holding a pen. Kind of like a 3D printer, except for 2D and it's not really a printer.

## What if I don't have a plotter? 

You can still make a plotter ready artwork! Maybe send it to someone who does have a plotter. Or simply take this as a challenge to produce a completely line based artwork, that may or may not one day be executed by a proper drawing robot.

## What do I need to consider?

A work is considered "plotter ready" if it can be drawn using a plotter. 

The big limitation is that a plotter can only draw lines. And that it cannot erase lines. It can also not draw over the same spot 20 times because the robot doesn't care and the pen will rip through the paper. 

In theory you can draw a dot with a very short line or small circle, however it takes a small but non-trivial amount of time to lift up the pen and lower it again, so if you have 50 000 dots, this will take a lot of time. So it pays off to draw a small number of long lines. Or even just one very long line. 

Changing pens is a [hassle](https://en.wiktionary.org/wiki/faff), so you don't want to do that too often, or preferably not at all. It's also hard to make sure each new pen is neatly aligned with the earlier ones. 

Now you might wonder why people even bother. 

## I'm wondering why people even bother

The upside of plotters is that they are ridiculously precise and can draw with a super fine lines (it's hard to find reliable pens finer than 0.25mm). And you can get more interesting textures than printers using e.g. ballpoint or fountain pens. 

You can even use paint brushes or charcoal or whatever else you can think about, though each of these methods comes with their own unique challenges.

It's quite hypnotic to look at and the robot continues plotting at night when you're not looking.

## OK fine how do I do this?

Generally plotter artists use SVG files to represent their plots.

In case you don't know how to SVG, you only need to learn a super tiny bit about SVG, because you only need/get to draw lines. This means you don't get/need to use the fancy SVG filters, or most complicated stuff. In fact you don't get to use the `fill` attribute! Because you only get lines, which includes having to use only lines to hatch filled areas.

To help you out we have made various pieces of code available that you can download and change and adopt into your own thing:

* [template D](genuary-22-svg-template-d) ([src]())


genuary-22-svg-template-d2.html
genuary-22-svg-template-c.html
genuary-22-svg-template-b.html
genuary-22-svg-template-a.html
