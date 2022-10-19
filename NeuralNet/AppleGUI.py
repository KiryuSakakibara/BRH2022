from cProfile import label
import tkinter as tk
from tkinter import Label, ttk
from tkinter import filedialog as fd
from tkinter.messagebox import showinfo
from PIL import Image, ImageTk
from FreshStale import evaluate_image

root = tk.Tk()

window_width = 900
window_height = 600

# get the screen dimension
screen_width = root.winfo_screenwidth()
screen_height = root.winfo_screenheight()

# find the center point
center_x = int(screen_width/2 - window_width / 2)
center_y = int(screen_height/2 - window_height / 2)

# set the position of the window to the center of the screen
root.geometry(f'{window_width}x{window_height}+{center_x}+{center_y}')

image = Label(root)
imageLabel = Label(root, font=("Helvetica", 30))

def select_file():
    filetypes = (
        ('PNG, JPG', ('*.png', '*.jpg')),
    )

    filename = fd.askopenfilename(
        title='Open a file',
        initialdir='.',
        filetypes=filetypes)

    im = Image.open(filename)
    im = im.resize((int(im.width/10), int(im.height/10)))
    tkImage = ImageTk.PhotoImage(im)
    image.configure(image=tkImage)
    image.image = tkImage
    isFresh = evaluate_image(filename)
    imageLabel.configure(text=isFresh)


# open button
open_button = ttk.Button(
    root,
    text='Open a File',
    command=select_file
)

open_button.pack()
image.pack()
imageLabel.pack()


# run the application
root.mainloop()