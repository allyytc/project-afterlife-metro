
extends Control

@export var next_scene_path: String = "res://Assets/Scenes/dialogue scenes + scripts/dialogue_2.tscn"

func _ready():
	$NextButton.pressed.connect(_on_next_pressed)

func _on_next_pressed():
	var scene = load(next_scene_path)
	get_tree().change_scene_to_packed(scene)
