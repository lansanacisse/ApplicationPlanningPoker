# import library
import pygame # import pygame library

pygame.init() # initialize pygame
pygame.display.set_caption("The Planning Poker") # set window title
screen = pygame.display.set_mode((1280, 720)) # define screen size

clock = pygame.time.Clock() # define clock
running = True # define running

while running: # main game loop
    # poll for events
    # pygame.QUIT event means the user clicked X to close your window
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # fill the screen with a color to wipe away anything from last frame
    screen.fill("purple")

    # RENDER YOUR GAME HERE

    # flip() the display to put your work on screen
    pygame.display.flip()

    clock.tick(60)  # limits FPS to 60

pygame.quit()
